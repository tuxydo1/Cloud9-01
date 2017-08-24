var express = require("express");
/*Create a new instance of the express router and then add all the routes to this using router.get... etc.*/
var router = express.Router();

var passport = require("passport");
var User = require("../models/user");
 
router.get("/", function(req, res) {
   res.render("landing");
  
});




/********************
Auth Routes
*********************/
/*Show register form*/
router.get("/register", function(req, res) {
   res.render("register");   
});

/*Handle sign up logic*/
router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
      if (err) {
         console.log(err);
         return res.render("register");
      }
      passport.authenticate("local")(req, res, function(){
         res.redirect("/campgrounds");   
      });
   });   
});

/*Show login form*/
router.get("/login", function(req, res){
   res.render("login");  
});

/*Handle login logic - using passport.authenticate middleware*/
router.post("/login", passport.authenticate("local", 
{
   successRedirect: "/campgrounds", 
   failureRedirect: "/login"
}),
/*Following callback function not really necessary but left in to show that the above is a middleware*/
function(req, res) {
});

/*Logout*/
router.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/campgrounds");
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