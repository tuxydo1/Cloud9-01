/*APP FOR EXPRESS ROUTING ASSIGNMENT*/
var express = require("express");
var app = express();

app.get("/", function(req, res) {
   res.send("Hi there, welcome to my assignment!");   
});

app.get("/speak/:animal", function(req, res) {
   var noise = "";
   var animal = req.params.animal;
   if (animal === "pig") {
      noise = "Oink";
   }
   else if (animal === "cow") {
      noise = "Moo";
   }
   else if (animal === "dog") {
      noise = "Woof Woof!";
   }
   else {
      noise ="Sorry, page not found ... what are you doing with your life?";
   }
   res.send(noise);
   
    
});

app.get("/repeat/:word/:num", function(req, res) {
   var message = "";
   var word = req.params.word;
   var num = parseInt(req.params.num,10);
   
   for (var i = 0; i < num; i++) {
      message = message + " " + word;
   }
   res.send(message);
   
    
});

app.get("*", function(req, res) {
   res.send("Sorry, page not found ... what are you doing with your life?");   
});

app.listen(process.env.PORT,process.env.IP,function() {
   console.log("Server has started!");
   
});