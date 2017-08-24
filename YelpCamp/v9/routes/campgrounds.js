var express = require("express");
/*Create a new instance of the express router and then add all the routes to this using router.get... etc.*/
var router = express.Router();

var Campground = require("../models/campground");

/*"INDEX" route - show all campgrounds*/
router.get("/campgrounds", function(req, res) {
  Campground.find(function(err, allCampgrounds){
      if (err) {
         console.log("An error has occurred");
         console.log(err);
      }
      else {
        
         res.render("campgrounds/index", {campgrounds: allCampgrounds});
         
      }
   });
      
   
});

/*"CREATE" route - add new campground to database*/
/*Convention is to make the get and post routes have the same name - /campgrounds in this case*/
router.post("/campgrounds", function(req, res) {
   
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   /*Make an author object with id and name from the req*/
   var author = {
      id: req.user._id,
      username: req.user.username
   };
   var newCampground = {name: name, image: image, description: desc, author: author};
   
   /*campgrounds.push(newCampground);*/
   Campground.create(newCampground, isLoggedIn, function(err, campground){
      if (err) {
         console.log("An error has occurred");
      }
      else {
         console.log(campground);
         /*There are two /campgrounds routes, but the default for redirect is the GET route*/
         res.redirect("/campgrounds");
      }
   });
   
   
});

/*"NEW" route - show form to create new campground*/
router.get("/campgrounds/new", isLoggedIn, function(req, res) {
     res.render("campgrounds/new");
      
});

/*"SHOW" route - show info about one campground*/
router.get("/campgrounds/:id", function(req, res) {
   
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if (err) {
         console.log("An error has occurred");
      }
      else {
         res.render("campgrounds/show", {campground: foundCampground});
      }
   });
   
      
});

/*A middleware to help check if user logged in:*/
function isLoggedIn(req, res, next){
   
   
   if (req.isAuthenticated()) {
      /*Must be 'return next() below and not just 'return next'!*/
      return next();   
   } 
   
   res.redirect("/login");
}

/*Need to export router at end to return it with all the routes in it:*/
module.exports = router;