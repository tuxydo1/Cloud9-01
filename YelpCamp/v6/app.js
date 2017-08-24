var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp_v6");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

/*serve the public directory for css and front-end javascript: (--dirname means the directory in which this script is run from)*/
app.use(express.static(__dirname + "/public"));

/*Clear out the database and populate with new data*/
seedDB();

/*Passport Configurstion*/
app.use(require("express-session")({
   secret: "This can be any line of text at all",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*Some middleware to ensure that the user object is available in every template*/
/*(app.use calls this function for every route)*/
app.use(function(req, res, next){
   /*Whatever we put in res.locals is available in our templates*/
   res.locals.currentUser = req.user;
   /*Need the line below to move on to the next code, otherwise middleware will just stop*/
   next();
})
 
app.get("/", function(req, res) {
   res.render("landing");
  
});

/*"INDEX" route - show all campgrounds*/
app.get("/campgrounds", function(req, res) {
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
app.post("/campgrounds", function(req, res) {
   
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: image, description: desc};
   
   /*campgrounds.push(newCampground);*/
   Campground.create(newCampground, function(err, campground){
      if (err) {
         console.log("An error has occurred");
      }
      else {
         /*There are two /campgrounds routes, but the default for redirect is the GET route*/
         res.redirect("/campgrounds");
      }
   });
   
   
});

/*"NEW" route - show form to create new campground*/
app.get("/campgrounds/new", function(req, res) {
     res.render("campgrounds/new");
      
});

/*"SHOW" route - show info about one campground*/
app.get("/campgrounds/:id", function(req, res) {
   
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if (err) {
         console.log("An error has occurred");
      }
      else {
         res.render("campgrounds/show", {campground: foundCampground});
      }
   });
   
      
});

/********************
Comments Routes
*********************/
/*isLoggedIn is a middleware defined later on in this module.  It checks if user is logged in before enabling comment entry*/
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
   
   Campground.findById(req.params.id, function(err, campground) {
      if (err) {
         console.log(err);
      }
      else {
         res.render("comments/new", {campground: campground});
      }
   });   
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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
               /*Associate comment with campground*/
               campground.comments.push(comment);
               campground.save();
               res.redirect("/campgrounds/" + campground._id);
            }
         });
      }
   });
});

/********************
Auth Routes
*********************/
/*Show register form*/
app.get("/register", function(req, res) {
   res.render("register");   
});

/*Handle sign up logic*/
app.post("/register", function(req, res){
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
app.get("/login", function(req, res){
   res.render("login");  
});

/*Handle login logic - using passport.authenticate middleware*/
app.post("/login", passport.authenticate("local", 
{
   successRedirect: "/campgrounds", 
   failureRedirect: "/login"
}),
/*Following callback function not really necessary but left in to show that the above is a middleware*/
function(req, res) {
});

/*Logout*/
app.get("/logout", function(req, res) {
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

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("App has started");
});