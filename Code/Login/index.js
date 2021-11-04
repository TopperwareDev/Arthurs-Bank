const bodyParser = require("body-parser");

var express = require('express');
var app = module.exports = express();

app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/Login", (req,res) => {

res.sendFile(__dirname + '/Login.html')

});

app.post("/Login", (request,respond) => {

const {USERNAME_FIELD, PASSWORD_FIELD} = request.body;

//console.log('This is the password '  + USERNAME_FIELD + ' This is the passowrd ' + PASSWORD_FIELD);

if(USERNAME_FIELD == "admin" && PASSWORD_FIELD == "1234")

    respond.redirect('/Home')

});
