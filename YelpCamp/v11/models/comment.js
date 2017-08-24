var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
   text: String,
   /*Having the author as an object like this allows us to store the bits of the user object from the db that we need:*/
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});


module.exports = mongoose.model("Comment", commentSchema);