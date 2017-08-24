var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground= mongoose.model("Campground", campgroundSchema);



 /*Temporary array of campgrounds as we don't have database yet:*/   
  /* var campgrounds =
   [
      {name: "Coulsdon", image: "https://farm8.staticflickr.com/7098/7256370618_1ba3e9418f.jpg"},
      {name: "Chipstead", image: "https://farm3.staticflickr.com/2664/4001698380_a96d19a5a2.jpg"},
      {name: "Tadworth", image: "https://farm1.staticflickr.com/148/394519766_ab9bc8c2be.jpg"},
      {name: "Tattenham Corner", image: "https://farm4.staticflickr.com/3233/3111841300_332cf7903c.jpg"},
      {name: "Ewell South", image: "https://farm6.staticflickr.com/5191/14322379482_0cd8610b97.jpg"},
      {name: "Chessington South", image: "https://farm4.staticflickr.com/3272/2584557036_4c1cabe4af.jpg"},
      {name: "Kingston", image: "https://farm9.staticflickr.com/8245/28416744451_925c3852da.jpg"},
      {name: "Hampton", image: "https://farm6.staticflickr.com/5589/14350675630_48eb628c80.jpg"}
      ];*/
      
/*Campground.create(
   {
      name:"Chipstead",
      image: "https://farm3.staticflickr.com/2664/4001698380_a96d19a5a2.jpg",
      description: "Through Banstead Woods, past the 'Kingswood Crematorium' and back to the White Hart for a well deserved pint"
   }, 
   function(err, campground){
      if (err) {
         console.log("An error has occurred");
      }
      else {
         
         console.log("Campground created:");
         console.log(campground);
      }
   });*/

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
         res.render("index", {campgrounds: allCampgrounds});
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
   res.render("new");   
});

/*"SHOW" route - show info about one campground*/
app.get("/campgrounds/:id", function(req, res) {
   
   Campground.findById(req.params.id, function(err, foundCampground){
      if (err) {
         console.log("An error has occurred");
      }
      else {
         res.render("show", {campground: foundCampground});
      }
   });
   
      
});


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("App has started");
});