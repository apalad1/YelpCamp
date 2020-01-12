//seeds js isnt used anymore since the database is set up already

var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{name: "Cloud's Rest", image: "https://www.travelyosemite.com/media/820697/c_cf_vogelsang-tent_1600x900.jpg", description: "Bacon ipsum dolor amet tenderloin ribeye capicola, buffalo jerky andouille turkey. Capicola chislic jerky, cupim brisket pig prosciutto doner buffalo frankfurter chicken filet mignon ball tip pork belly turducken. Cow rump beef kielbasa t-bone cupim bresaola swine pancetta turkey pork belly filet mignon frankfurter leberkas shoulder. Ground round ham hock buffalo, turkey jowl burgdoggen beef ribs ribeye picanha. Bresaola kielbasa turkey burgdoggen spare ribs jowl salami rump venison picanha beef. Spare ribs venison burgdoggen strip steak, kevin jerky chislic rump biltong."},
	{name: "camp 2", image: "https://images.squarespace-cdn.com/content/v1/565fc580e4b05a14ac7a591b/1517519566448-8GOFZJZWZN8JF3PDEOAM/ke17ZwdGBToddI8pDm48kF9aEDQaTpZHfWEO2zppK7Z7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UX7HUUwySjcPdRBGehEKrDf5zebfiuf9u6oCHzr2lsfYZD7bBzAwq_2wCJyqgJebgg/camp+homepage+copy+2.jpg?format=2500w", description: "blahblahblah"},
	{name: "camp 3", image: "https://campfriendship.com/wp-content/uploads/2019/02/CF-camp-friendship-virginia-about-us-IMG_1430-1920-2-960x470.jpg", description: "Bacon ipsum dolor amet landjaeger pancetta buffalo shankle shoulder pig. Tri-tip tongue turkey picanha. Chicken doner pork chop frankfurter ham corned beef ball tip pig burgdoggen biltong shank turducken shoulder chuck kevin. Sausage meatloaf shoulder buffalo fatback capicola beef ribs ball tip kielbasa tri-tip pork chop. Tail me"}
]

function seedDB(){
	//remove campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds");
		//add campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				} else{
					console.log("added campground");
					//create comment
					Comment.create(
						{text: "this place is great but i wish there was internet",
						 author: "homer"
						}, function(err, comment){
							if(err){
							  console.log(err)
							} else{
								campground.comments.push(comment);
								campground.save();
								console.log("created new comment")
							}				
							
						});
				}
			});
		});
	});
	
	
}

module.exports = seedDB;
