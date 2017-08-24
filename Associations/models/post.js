var mongoose = require("mongoose");
/*Create the post schema:*/
var postSchema = new mongoose.Schema({
   title: String,
   content: String
});
/*Build the post model from the user schema*/
/*AND export it out of this model (a bit like returning something fron a function, etc.)*/
module.exports = mongoose.model("Post", postSchema);