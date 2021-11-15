var express = require('express');
var app = module.exports = express();

app.get("/Home", (req,res) => {

res.sendFile(__dirname + '/User_Menu.html')

});
