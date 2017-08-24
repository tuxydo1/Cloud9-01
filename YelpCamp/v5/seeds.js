/*A file to clear the database and seed it with new data*/

var mongoose = require("mongoose");
var Campground = require ("./models/campground");
var Comment = require("./models/comment");

/*Seed data to populate the database:*/
var data = [
   {
      name: "Coulsdon",
      image: "https://farm8.staticflickr.com/7098/7256370618_1ba3e9418f.jpg",
      description: "A stroll across Farthing Downs and along Happy Valley to the wonderful, ancient Chaldon Church. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id rutrum lorem, vel commodo urna. Nullam dignissim quam a libero ornare, in ultrices nunc efficitur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque ac sapien sit amet purus tristique finibus. Nulla in metus et libero egestas pharetra sodales sed turpis. Cras placerat sodales arcu, ut varius augue. Suspendisse maximus ipsum eget aliquam aliquet. Praesent pretium tortor eget risus facilisis, eu congue neque convallis. Morbi sed ligula mauris. Phasellus metus justo, euismod vel arcu eget, efficitur dictum dui. Praesent sollicitudin nulla dui, in mollis orci maximus nec. Fusce est justo, pharetra sit amet accumsan non, eleifend sit amet enim."
   },
   {
      name: "Chipstead",
      image: "https://farm3.staticflickr.com/2664/4001698380_a96d19a5a2.jpg",
      description: "Through Banstead Woods, past the 'Kingswood Crematorium' and back to the White Hart for a well deserved pint. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id rutrum lorem, vel commodo urna. Nullam dignissim quam a libero ornare, in ultrices nunc efficitur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque ac sapien sit amet purus tristique finibus. Nulla in metus et libero egestas pharetra sodales sed turpis. Cras placerat sodales arcu, ut varius augue. Suspendisse maximus ipsum eget aliquam aliquet. Praesent pretium tortor eget risus facilisis, eu congue neque convallis. Morbi sed ligula mauris. Phasellus metus justo, euismod vel arcu eget, efficitur dictum dui. Praesent sollicitudin nulla dui, in mollis orci maximus nec. Fusce est justo, pharetra sit amet accumsan non, eleifend sit amet enim."
   },{
      name: "Tadworth",
      image: "https://farm1.staticflickr.com/148/394519766_ab9bc8c2be.jpg",
      description: "An interesting wander about in the middle of nowhere really. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id rutrum lorem, vel commodo urna. Nullam dignissim quam a libero ornare, in ultrices nunc efficitur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque ac sapien sit amet purus tristique finibus. Nulla in metus et libero egestas pharetra sodales sed turpis. Cras placerat sodales arcu, ut varius augue. Suspendisse maximus ipsum eget aliquam aliquet. Praesent pretium tortor eget risus facilisis, eu congue neque convallis. Morbi sed ligula mauris. Phasellus metus justo, euismod vel arcu eget, efficitur dictum dui. Praesent sollicitudin nulla dui, in mollis orci maximus nec. Fusce est justo, pharetra sit amet accumsan non, eleifend sit amet enim."
   }
   ];

function seedDB() {
   /*Clear out the database:*/
   Campground.remove("{}", function(err){
      if (err) {
         console.log(err);
      }   
      else {
         console.log("Campgrounds database cleared");
         /*Add a few campgrounds - has to be inside this callback function to ensure it is done after the remove step has completed*/
         data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
            if (err){
               console.log(err);
            }   
            else {
               console.log("Added a campground");
               /*Add some comments - again, has to be done inside *this* callback function*/
               Comment.create({
                  text: "This place is great",
                  author: "Me"
               }, function (err, comment) {
                  if (err) {
                     console.log(err);
                  }
                  else {
                     campground.comments.push(comment);
                     campground.save();
                     console.log ("Created new comment");
                  }
               }
               )
         }
      });   
   });
      }
   });
   
   
   
   
}

/*'Return' the function defined above:*/
module.exports = seedDB;