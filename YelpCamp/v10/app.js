var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");

/*Include all the modules with the routes in them:*/
var   commentRoutes     = require("./routes/comments"),
      campgroundRoutes  = require("./routes/campgrounds"),
      indexRoutes       = require("./routes/index");


mongoose.connect("mongodb://localhost/yelp_camp_v10");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

/*serve the public directory for css and front-end javascript: (--dirname means the directory in which this script is run from)*/
app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));

/*Clear out the database and populate with new data*/
/*Commented out for now*//*seedDB();*/

/*Passport Configuration*/
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

/*Tell the app to use the three route modules 'required' near the top of this module:*/
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("App has started");
});