var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var seedDB = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp_v3");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

/*Clear out the database and populate with new data*/
seedDB();

 
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
app.get("/campgrounds/:id/comments/new", function(req, res) {
   Campground.findById(req.params.id, function(err, campground) {
      if (err) {
         console.log(err);
      }
      else {
         res.render("comments/new", {campground: campground});
      }
   });   
});

app.post("/campgrounds/:id/comments", function(req, res){
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


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("App has started");
});