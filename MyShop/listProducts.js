var faker = require('faker');


console.log("===================");
console.log("WELCOME TO MY SHOP!");
console.log("===================");


/*for (var i = 0; i < 10; i++){
   var randomBsAdj1 = faker.company.bsAdjective();
   var randomBsAdj2 = faker.company.bsAdjective();
   var randomBsNoun = faker.company.bsNoun();
   var randomAmount = faker.finance.amount();
   console.log(randomBsAdj1 + " " + randomBsAdj2 + " " + randomBsNoun +  " - $" + randomAmount);
}*/

for (var i = 0; i < 10; i++){
   var randomBsAdj1 = faker.commerce.productAdjective();
   var randomBsAdj2 = faker.commerce.productAdjective();
   var randomBsNoun = faker.commerce.productName();
   var randomAmount = faker.finance.amount();
   console.log(/*randomBsAdj1 + " " + randomBsAdj2 + " " + */randomBsNoun +  " - $" + randomAmount);
}

