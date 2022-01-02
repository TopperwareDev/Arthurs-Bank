var express = require('express');
var app = module.exports = express();

app.get("/Blackjack", (request,respond) => {

    respond.sendFile(__dirname + '/Blackjack.html')

});

app.post("/Blackjack/chipPurchase", (request,respond) => {

    console.log("uh oh yay");
    
});