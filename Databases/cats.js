/*(Previously installed mongoose in shell using 'npm install mongoose')*/
var mongoose = require("mongoose");

/*The following line is just to get rid of an error message that was appearing - 'promises' not relevant to this course*/
mongoose.Promise = global.Promise;

/*Connect to cat_app DB, or create it if it doesn't exist (must have mongod daemon running)*/
mongoose.connect("mongodb://localhost/cat_app");

/*Define a cat*/
var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

/*Take the catSchema pattern and compile it into a model and save to a variable called Cat.*/
/*Cat then is an object that has all the methods that we need to use.*/
/*Note that "cat" is in the singular and it is converted to plural for the collection name*/
var Cat = mongoose.model("Cat", catSchema);

/*Create a new cat in two steps*/
/*var newCat = new Cat({
   name: "Mrs. Norris",
   age: 7,
   temperament: "Evil"
});*/

/*Add the new cat to the DB, passing callback function in case save doesn't work*/
/*newCat.save(function(err, cat){
   if (err) {
      console.log("An error has occurred");
   }
   else {
      console.log("Cat added to DB:");
      console.log(cat);
   }
});*/

/*Create a new cat in one step*/
/*Cat.create({
   name: "Snow White",
   age: 11,
   temperament: "Bland"
   }, function(err, cat){
   if (err) {
      console.log("An error has occurred");
   }
   else {
      console.log("Cat added to DB:");
      console.log(cat);
   }
});*/

/*Retrieve all cats from DB*/
Cat.find(function(err, cats){
   if (err) {
      console.log("An error has occurred");
      console.log(err);
   }
   else {
      console.log("All the cats:");
      console.log(cats);
   }
});