var express = require("express");
var app = express();

/*Tell Express to use the 'public' directory (which contains the css and javascript modules):*/
app.use(express.static("public"));

/*The following line saves us from having to add '.ejs' to our ejs files in the re.render() operations below*/
app.set("view engine", "ejs");

app.get("/", function(req, res) {
   res.render("home");
});

app.get("/like/:thing", function(req, res) {
   var thing = req.params.thing;
   /*Pass the variable parts in an object as the second parameter below:*/
   /*(thingVar refers to a variable in the ejs file, and we are assigning the value in thing to this in the object below)*/
   res.render("like", {thingVar: thing});
});


/*Loops:*/
app.get("/posts", function(req, res){
   
   /*An array of post objects:*/
   var posts = [
      {title: "Title 1", author: "Author 1"},
      {title: "Title 2", author: "Author 2"},
      {title: "Title 3", author: "Author 3"}
      ];
      
   res.render("posts", {posts: posts});
   
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("App started OK");
   
});