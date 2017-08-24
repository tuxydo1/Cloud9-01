var   express                 = require("express"),
      mongoose                = require("mongoose"),
      passport                = require("passport"),
      bodyParser              = require("body-parser"),
      User                    = require("./models/user"),
      LocalStrategy           = require("passport-local"),
      passportLocalMongoose   = require("passport-local-mongoose");
      
mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
app.set("view engine", "ejs");

/*Need this line any time we are using a form and posting data to a request:*/
app.use(bodyParser.urlencoded({extended: true}));

/*Can do an app.use and a require in the same statement:*/
app.use(require("express-session")({
   /*This will be used to code and decode the sessions - can use any phrase for this:*/
   secret: "Cats are small and furry and really good animals to know",
   resave: false,
   saveUninitialized: false
}));

/*Tell express to use passport and set it up so that it will work in aour application:*/
app.use(passport.initialize());
app.use(passport.session());

/*The next line is 'explained' in lecture 271 near the end!*/
passport.use(new LocalStrategy(User.authenticate()));

/*Methods resposible for reading the session and coding and unencoding the data:*/
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*===================*/
/*ROUTES*/
/*===================*/

app.get("/", function (req, res){
   res.render("home");
});

/*isLoggedIn is defined as a middleware at the end of app.js below*/
/*The 'next()' returned from the middleware causes the function which is the third parameter below to be run*/
app.get("/secret", isLoggedIn, function (req, res){
   res.render("secret");
});

/*Show sign up form*/
app.get("/register", function(req, res){
   res.render("register");   
});

/*Handle user sign up*/
app.post("/register", function(req, res){
   /*Make a new user passing in username, but not password.*/
   /*Passwors is passed as second argument to User.register which hashes the password, and this is what is actually stored in DB*/
   User.register(new User({username: req.body.username}), req.body.password, function(err, user){
      if (err){
         console.log(err);
         return res.render("register");
      }
      /*If no error, log the user in, take care of everything in the session, run the serializeUser method.*/
      /*"local" parameter indicates we want to use the local strategy (i.e. not Facebook or Twitter or something else)*/
      passport.authenticate("local")(req, res, function() {
         res.redirect("/secret");   
      });
   });  
});

/*Show login form*/
app.get("/login", function(req, res) {
   res.render("login");   
});

/*Login logic*/
/*The second parameter below (passport.authenticate...)is known as middleware some code that runs before the final route callback*/
app.post("/login",  passport.authenticate("local", {
   successRedirect: "/secret",
   failureRedirect: "/login"
}), function(req, res){
   
});

/*Logout*/
app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/");
});

/*Middleware function to check if user is logged in*/
function isLoggedIn (req, res, next) { /*These three parameters are normal for middleware - 'next' is the next thing to be called*/
   if (req.isAuthenticated()) {
      /*next followed by () below means return and run next*/
      return next();
   }  
   res.redirect("/login");
}

app.listen(process.env.PORT, process.env.ID, function(){
   console.log("App started OK");   
})