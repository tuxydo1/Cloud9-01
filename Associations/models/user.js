var mongoose = require("mongoose");
/*Create the user schema:*/
var userSchema = new mongoose.Schema({
   email: String,
   name: String,
   /*'posts' is an array of object ids this time:*/
   posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
      
   }]
});
/*Build the user model from the user schema*/
/*AND export it out of this model (a bit like returning something fron a function, etc.)*/
module.exports = mongoose.model("User", userSchema);