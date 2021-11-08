var express = require('express');
var app = module.exports = express();

app.get("/CreateAccount", (req,res) => {

res.sendFile(__dirname + '/Create_Account.html')

});
