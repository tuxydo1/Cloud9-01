var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

 /*Temporary array of campgrounds as we don't have database yet:*/   
   var campgrounds =
   [
      {name: "Coulsdon", image: "https://farm9.staticflickr.com/8004/7257021708_28ba88b369.jpg"},
      {name: "Chipstead", image: "https://farm3.staticflickr.com/2664/4001698380_a96d19a5a2.jpg"},
      {name: "Tadworth", image: "https://farm1.staticflickr.com/148/394519766_ab9bc8c2be.jpg"},
      {name: "Tattenham Corner", image: "https://farm4.staticflickr.com/3233/3111841300_332cf7903c.jpg"}
      ];

app.get("/", function(req, res) {
   res.render("landing");   
});


app.get("/campgrounds", function(req, res) {
  
      
   res.render("campgrounds", {campgrounds: campgrounds});
});

/*Convention is to make the get and post routes have the same name - /campgrounds in this case*/
app.post("/campgrounds", function(req, res) {
   
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   
   campgrounds.push(newCampground);
   
   /*There are two /campgrounds routes, but the default for redirect ids the GET route*/
   res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new");   
});


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("App has started");
});