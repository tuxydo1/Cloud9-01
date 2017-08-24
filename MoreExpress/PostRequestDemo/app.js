var express = require("express");
var app = express();

/*Need the two lines below so that Express can get at the body of the request!*/
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

/*Set up a global array, as we are not using datbases yet:*/
var languages = ["english",
                     "french",
                     "german",
                     "italian",
                     "spanish",
                     ];

app.get("/", function(req, res) {
   
   res.render("home");
   
});

app.get("/languages", function(req, res){
   
   
   
   res.render("languages", {languages: languages});
   
});

app.post("/addlanguage", function(req, res){
   /*Get the value of newlanguage from the request object (see above for request initialisation work required)*/
   var newLanguage = req.body.newlanguage;
   /*Add the new language to the global languages array:*/
   languages.push(newLanguage);
   
   /*Redirect back to the languages page*/
   res.redirect("/languages");
   
   
});

app.listen(process.env.PORT, process.env.IP, function() {
   
   console.log("Server started OK");
   
});