/*Basic code lines copied from github, then added to - to check on errors, etc.*/
/*Have already done npm install request in console*/
var request = require('request');
/*Make a request to a url, passing a function - need the function in case there's a time delay in the response*/
request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
         function (error, response, body) {
   
   if (error) {
      console.log("Something went wrong");
      console.log(error);
   }
   else {
      /*Status code 200 = call worked OK*/
      if (!error && response.statusCode == 200) {
         /*Output the response body*/
         console.log("body in string form = " + body); 
         /*body is returned as a string so we have to convert it to an object to use stuff in it:*/
         var parsedData = JSON.parse(body);
         
         /*console.log("body in object form:");
         console.log(parsedData);
         console.log("results:");
         console.log(parsedData["query"] ["results"]);
         console.log("sunset time:");*/
         
         /*Now we can drill down to get the sunset time:  (NB Yahoo interface only seems to work intermittently)*/
         console.log(parsedData["query"] ["results"] ["channel"] ["astronomy"] ["sunset"]);
      }
   }
})