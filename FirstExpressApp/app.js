/*Have already done a npm install to get express modules in directory, now do 'require' to include in this app:*/
var express = require("express");

/*The line below then makes all the express methods available via a variable called 'app' (could be called anything)*/
var app = express();

/*Set up the 'route' for '/' get request*/
app.get("/",function(req,res) {
   /*req (can be any name) is an object which contains all the information about the request that was made*/
   /*res (can be any name) is an object which contains all the information about what we're going to respond with*/
   res.send("Hi there!");

   
});

/*The /bye route:*/
app.get("/bye",function(req,res) {
   /*req (can be any name) is an object which contains all the information about the request that was made*/
   /*res (can be any name) is an object which contains all the information about what we're going to respond with*/
   res.send("Goodbye!");

   
});

/*Using Route Parameters:*/
app.get("/dir/:subcategory/comments/:blurb",function(req,res) {
   /*Print out the request params, which indicate what has been substituted into the route parameters:*/
   console.log(req.params);
   
   /*Get the request parameter values into variables:*/
   var subcategory = req.params.subcategory;
   var blurb = req.params.blurb;
   res.send("In the " + subcategory + " subcategory, with this blurb: " + blurb);

   
});

/*The answers to the assignment - showing dictionary use and char to num conversion:*/
app.get("/speak/:animal", function(req, res){
   /*DICTIONARY:*/
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        cat: "I hate you human",
        goldfish: "..."
    }
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The " + animal + " says '" + sound + "'"); 
});

app.get("/repeat/:message/:times", function(req, res){
    var message = req.params.message;
    /*CHAR TO NUM CONVERSION:*/
    var times = Number(req.params.times);
    var result = "";

    for(var i = 0; i < times; i++){
        result += message + " ";
    }
    res.send(result);
});

/*The catch-all route:*/
app.get("*",function(req,res) {
   
   res.send("This route doesn't exist at the moment, dummy");

   
});
/*Tell express to listen for requests (start server)*/
/*First parameter would normally be a port number but have to use environment variable in Cloud9, as shown*/
/*Not clear what second parameter is, but also needed by Cloud9, it seems - something to do with hostname?*/
app.listen(process.env.PORT,process.env.IP,function() {
   console.log("Server has started!");
   console.log("process.env.PORT = " + process.env.PORT);
   console.log("process.env.IP = " + process.env.IP);
});

