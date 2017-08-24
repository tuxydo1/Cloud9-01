/*Having done npm install mongoose in shell, now 'require' mongoose:*/
var mongoose = require("mongoose");
/*'Require' the post and user modules from the models directory (./ ensures that we start from current directory, i.e. Associations:*/
var Post = require("./models/post");
var User = require("./models/user");

/*Connect to a database called blog_demo (which will create it if it doesn't already exist):*/
mongoose.connect("mongodb://localhost/blog_demo_2");

/*Create a new post:*/
/*Post.create({
   title: "Natter",
   content: "I go on and on and on and on..."
}, function(err, post){
      if(err) {
         console.log(err);
      }
      else{
         console.log(post);
      }
});*/

/*Create a new user:*/
/*User.create({
   email: "chatterbox@talk.edu",
   name: "Ruby Wax"
});*/

/*Create a new post and add to a user:*/
Post.create({
   title: "Nattering again",
   content: "Several days later, still going..."
}, function(err, post){
      if(err) {
         console.log(err);
      }
      else{
         User.findOne({email: "chatterbox@talk.edu"}, function(err, foundUser){
            if (err){
               console.log(err);
            }
            else {
               foundUser.posts.push(post);
               foundUser.save(function(err, data) {
                  if (err) {
                     console.log(err);
                  }
                  else {
                     console.log(data);
                  }
               });
            }
         });
      }
});

/*Find a user and find all posts for that user:*/
/*Find the user*/
 /*User.findOne({email: "chatterbox@talk.edu"}).*/
               /*Then find the post for the user*/
              /* populate("posts").*/
               /*Exec the finds at this point, so this is where need to check for DB access arrors:*/
               /*exec(function(err, user) {
            if (err){
               console.log(err);
            }
            else {
               console.log(user);
            }

});*/