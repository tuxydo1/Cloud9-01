var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
   username: String,
   password: String
});

/*Take passport-local-mongoose package and add a load of methods that come with that package to the UserSchema:*/
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);