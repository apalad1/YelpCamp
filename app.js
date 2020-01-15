var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
	
flash = require("connect-flash"),
	
passport = require("passport"),
LocalStrategy = require("passport-local"),
methodOverride = require("method-override"),
Campground = require("./models/campground"),
Comment = require("./models/comment"),
User = require("./models/user"),
seedDB =  require("./seeds");

//requiring routes
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");


//

//****************CONNECT TO MONGO ATLAS DB **************************************
//the <password> is replaced by the mongodb password not the mongo atlas one, that also includes taking out the < >
//the 'aleck' is just my name, its based on your mongo username
//this link is only for my account, if you want to recreate this you'll need to create your own cluster on mongodb
mongoose.connect('mongodb+srv://aleck:<password>@cluster0-iavbd.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('connected to db');
}).catch(err => {
	console.log('ERROR: ', err.message);
});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use(flash()); //has to come before passport config to avoid error flash is not a func
//seedDB();

//Passport Config********************************************
app.use(require("express-session")({
	secret: "Once again Rusty",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
// ^ the /campgrounds fills in for campground js 
// thats why we can leave campground js at "/" 
//same idea with commentRoutes

//***************************SERVER CONNECTION **************************
// the first one connects to 3000 which is for when it's used in Goorm IDE
// the second one is for heroku

//app.listen(3000, () => {
   // console.log("yelpcamp started");
//});

app.listen(process.env.PORT, process.env.IP);
