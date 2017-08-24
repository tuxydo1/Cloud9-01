/*All the Middleware*/
var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

/*A middleware to check campground ownership before editing or deleting*/
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
         /*Is user logged in?*/
      if (req.isAuthenticated()) {
         Campground.findById(req.params.id, function (err, foundCampground){
            if (err) {
               /*Take the user back to where they came from*/
               res.redirect("back");
            }
            else{
               /*Does the user own the campground?*/
               /*(Need to use the .equals method as foundCampground.author.id is a Mongoose object and req.user._id is a string) */
               if (foundCampground.author.id.equals(req.user._id)) {
                  /*Move on to the next code, i.e. edit or delete campground in this case*/
                  next();   
               }
               else {
                  /*Take the user back to where they came from*/
                  res.redirect("back");
               }
                  
            }
         });   
      }
      else {
         /*Take the user back to where they came from*/
         res.redirect("back");
      }   
   };   

/*A middleware to check campground ownership before editing or deleting*/
middlewareObj.checkCommentOwnership = function(req, res, next){
      /*Is user logged in?*/
      if (req.isAuthenticated()) {
         Comment.findById(req.params.comment_id, function (err, foundComment){
            if (err) {
               /*Take the user back to where they came from*/
               res.redirect("back");
            }
            else{
               /*Does the user own the ccomment?*/
               /*(Need to use the .equals method as foundComment.author.id is a Mongoose object and req.user._id is a string) */
               if (foundComment.author.id.equals(req.user._id)) {
                  /*Move on to the next code, i.e. edit or delete campground in this case*/
                  next();   
               }
               else {
                  /*Take the user back to where they came from*/
                  res.redirect("back");
               }
                  
            }
         });   
      }
      else {
         /*Take the user back to where they came from*/
         res.redirect("back");
      }   
   };   

/*A middleware to help check if user logged in:*/
middlewareObj.isLoggedIn = function(req, res, next){
      if (req.isAuthenticated()) {
         /*Must be 'return next() below and not just 'return next'!*/
         return next();   
      } 
      
      res.redirect("/login");
   };

module.exports = middlewareObj;