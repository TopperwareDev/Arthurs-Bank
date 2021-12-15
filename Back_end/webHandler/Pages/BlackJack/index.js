var express = require('express');
var app = module.exports = express();

app.get("/Blackjack", (req,res) => {

res.sendFile(__dirname + '/Blackjack.html')

});