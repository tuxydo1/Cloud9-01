/*Having done npm install mongoose in shell, now 'require' mongoose:*/
var mongoose = require("mongoose");
/*Connect to a database called blog_demo (which will create it if it doesn't already exist):*/
mongoose.connect("mongodb://localhost/blog_demo");


/*Create the post schema:*/
var postSchema = new mongoose.Schema({
   title: String,
   content: String
});
/*Build the post model from the user schema*/
var Post = mongoose.model("Post", postSchema);

/*N.B. Must create user schema and model AFTER  post schema and model if posts are to be embedded in users*/
/*Create the user schema:*/
var userSchema = new mongoose.Schema({
   email: String,
   name: String,
   /*Not that we have to use the postSchema and not the post model below:*/
   posts: [postSchema]
});
/*Build the user model from the user schema*/
var User = mongoose.model("User", userSchema);

/*Create a new user:*/
/*var newUser = new User({
   email: "chatterbox@talk.edu",
   name: "Ruby Wax"
});*/
/*Add a post to the new user:*/
/*newUser.posts.push({
   title: "Talking Rubbish",
   content: "I do it all the time!"
});*/

/*Save the new user to the database:*/
/*newUser.save(function(err, user) {
   if(err) {
      console.log(err);
   }
   else {
      console.log("New User = " + user); 
   }
});*/

/*Create a new post:*/
/*var newPost = new Post({
   title: "The First Post",
  content: "This is the content for the first post"
});*/
/*Save the new post to the database:*/
/*newPost.save(function(err, post) {
   if(err) {
      console.log(err);
   }
   else {
      console.log("New Post = " + post); 
   }
});*/

/*Find user on the database*/
User.findOne({name: "Ruby Wax"}, function(err, user){
   if (err) {
      console.log(err);
   }
   else {
      /*If user found, add a new post:*/
      user.posts.push({
         title: "Ruby's second post",
         content: "Still not running out of things to go on about"
      });
      user.save(function(err, user) {
         if (err) {
            console.log(err);
         }
         else {
            console.log(user);
         }
      });
   }
});