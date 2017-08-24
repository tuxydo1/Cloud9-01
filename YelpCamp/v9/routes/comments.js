var express = require("express");
/*Create a new instance of the express router and then add all the routes to this using router.get... etc.*/
var router = express.Router();

var Campground = require("../models/campground");
var Comment = require("../models/comment");

/********************
Comments Routes
*********************/
/*isLoggedIn is a middleware defined later on in this module.  It checks if user is logged in before enabling comment entry*/
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
   
   Campground.findById(req.params.id, function(err, campground) {
      if (err) {
         console.log(err);
      }
      else {
         res.render("comments/new", {campground: campground});
      }
   });   
});

router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
   /*Look up campground using id:*/
   Campground.findById(req.params.id, function(err, campground){
      if (err) {
         console.log(err);
         res.redirect("/campgrounds");
      }
      else {
         /*Create new comment:*/
         /*req.body.comment is an object containing text and author because of how we specified inputs in new.ejs form*/
         Comment.create(req.body.comment, function(err, comment){
            if (err) {
               console.log(err);
            } 
            else {
               /*Add username and id to comment*/
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               /*Save the comment*/
               comment.save();
               /*Associate comment with campground*/
               campground.comments.push(comment);
               campground.save();
               res.redirect("/campgrounds/" + campground._id);
            }
         });
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

module.exports = router;