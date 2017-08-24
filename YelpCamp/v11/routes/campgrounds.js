var express = require("express");
/*Create a new instance of the express router and then add all the routes to this using router.get... etc.*/
var router = express.Router();

var Campground = require("../models/campground");

/*Doing a require for the directory 'middleware' gets the file within it called 'index'*/
var middleware = require("../middleware");

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
router.post("/campgrounds", middleware.isLoggedIn, function(req, res) {
   
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
   Campground.create(newCampground, function(err, campground){
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
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
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

/*Edit Campground Route*/
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
   Campground.findById(req.params.id, function (err, foundCampground){
      res.render("campgrounds/edit", {campground: foundCampground});   
   });
});

/*Update Campground Route*/
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function (req, res) {
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground){
      if (err) {
         res.redirect("/campgrounds");
      }
      else {
         res.redirect("/campgrounds/" + req.params.id);
      }
   });   
});

/*Delete Campground Route*/
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function (req, res) {
   Campground.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
         res.redirect("/campgrounds");
      }
      else {
         res.redirect("/campgrounds");
      }
   });
});

/*MIDDLEWARE*/




/*Need to export router at end to return it with all the routes in it:*/
module.exports = router;