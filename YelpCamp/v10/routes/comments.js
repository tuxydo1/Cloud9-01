var express = require("express");
/*Create a new instance of the express router and then add all the routes to this using router.get... etc.*/
var router = express.Router();

var Campground = require("../models/campground");
var Comment = require("../models/comment");

/*Doing a require for the directory 'middleware' gets the file within it called 'index'*/
var middleware = require("../middleware");

/********************
Comments Routes
*********************/
/*isLoggedIn is a middleware defined later on in this module.  It checks if user is logged in before enabling comment entry*/
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res) {
   
   Campground.findById(req.params.id, function(err, campground) {
      if (err) {
         console.log(err);
      }
      else {
         res.render("comments/new", {campground: campground});
      }
   });   
});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
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

/*Comment edit route*/
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if (err){
         res.redirect("back");
      }
      else {
         res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});   
      }
   });
      
});

/*Comment update route*/
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment){
      if (err){
         res.redirect("back");   
      }
      else {
         res.redirect("/campgrounds/" + req.params.id);   
      }
   });  
});

/*Comment Destroy Route*/
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err) {
      if (err) {
         res.redirect("back");
      }
      else {
         res.redirect("/campgrounds/" + req.params.id);
      }
   }); 
});




module.exports = router;