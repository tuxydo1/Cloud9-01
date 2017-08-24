/*Have already run 'npm install express mongoose body-parser --save' in the shell*/
/*The standard first bit that we need to set up the varioius variables, ordered by variable name length and tidied up:*/
var bodyParser    = require("body-parser"),
methodOverride    = require("method-override"),
expressSanitizer = require("express-sanitizer"),
mongoose          = require("mongoose"),
express           = require("express"),
app               = express();

/*APP SET UP*/
/*Allows us to specify ejs files without the ejs suffix:*/
app.set("view engine", "ejs");
/*Allows us to serve our custom stylesheet:*/
app.use(express.static("public"));
/*Another line that we need to use the body-Parser (so that Express can get at the request body):*/
app.use(bodyParser.urlencoded({extended: true}));
/*The three lines above will be needed in most apps and can just be copied and pasted in*/
/*The following line must go after the bodyParser line above*/
app.use(expressSanitizer());
/*The work around to be able to use PUT and DELETE actions in forms*/
app.use(methodOverride("_method"));

/*MONGOOSE SET UP*/
mongoose.connect("mongodb://localhost/restful_blog_app");
/*Create mongoose schema (note capital S in mongoose.Schema):*/
var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   /*Specify now as the default date:*/
   created: {type: Date, default: Date.now}
});
/*Compile the schema into a model:*/
var Blog = mongoose.model("Blog", blogSchema);

/*Single creation of a blog so that we have something to look at:*/
/*Blog.create({
   title: "Blog about a Black Cat",
   image: "https://unsplash.com/search/cat?photo=B1KFwtFFZl8",
   body: "Black cats are interesting",   
});*/

/*RESTFUL ROUTES*/

/*Redirect the '/' route to '/blogs' - convention is to do this:*/
app.get("/", function(req, res){
   res.redirect("/blogs");   
});

/*Index route:*/
app.get("/blogs", function(req, res){
   /*Get data from database:*/
   Blog.find({}, function(err, blogs){
      if(err){
         console.log("ERROR");
      }
      else{
         /*Render the index.ejs template from the views directory, passing the database data*/
         res.render("index", {blogs: blogs});         
      }
   });
});

/*New Route*/
app.get("/blogs/new", function(req,res){
   
   res.render("new");
   
});

/*Create Route*/
app.post("/blogs", function(req,res){
   
   /*Sanitize to remove any possible user-entered scripts:*/
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.create(req.body.blog, function(err, newBlog){
      if (err) {
         res.render("new");
      }
      else {
         res.redirect("/blogs");
      }
   });
   
});

/*Show Route*/
app.get("/blogs/:id", function(req,res){
   Blog.findById(req.params.id, function(err, foundBlog){
      if (err) {
         res.redirect("/blogs");
      }
      else
      {
         res.render("show", {blog: foundBlog});
      }
   });
});

/*Edit Route*/
app.get("/blogs/:id/edit", function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
      if (err){
         res.redirect("/blogs");   
      } 
      else{
         res.render("edit", {blog: foundBlog});   
      }
   });
     
});

/*Update Route*/
app.put("/blogs/:id", function(req, res) {
   /*Sanitize to remove any possible user-entered scripts:*/
   req.body.blog.body = req.sanitize(req.body.blog.body);   
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
      if (err) {
         res.redirect("/blogs");
      } 
      else{
         res.redirect("/blogs/" + req.params.id);
      }
   });
});

/*Destroy Route*/
app.delete("/blogs/:id", function(req, res) {
   Blog.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
         res.redirect("/blogs");
      }
      else{
         res.redirect("/blogs");
      }
   })
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("App is running");   
});