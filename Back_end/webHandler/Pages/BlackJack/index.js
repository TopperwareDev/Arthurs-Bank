var express = require('express');
var app = module.exports = express();

app.get("/BlackJack", (req,res) => {

res.sendFile(__dirname + '/Black_Jack.html')

});