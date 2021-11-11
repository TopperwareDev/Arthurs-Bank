const bodyParser = require("body-parser");

const express = require('express');
const app = module.exports = express();

const path = require('path');

const db = require(path.resolve('Back_end/mysql')); //get data base module

app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/Login", (req,res) => {

res.sendFile(__dirname + '/Login.html')

});

db.readTable('WEB_LOGIN', 2); //call function to read db into 2d array

app.post("/Login", (request,respond) => {

const {USERNAME_FIELD, PASSWORD_FIELD} = request.body;

//db.readTable('WEB_LOGIN', 2); //call function to read db into 2d array

//console.log('This is the password '  + USERNAME_FIELD + ' This is the passowrd ' + PASSWORD_FIELD);

if(USERNAME_FIELD == "admin" && PASSWORD_FIELD == "1234")

    respond.redirect('/Home')

});

module.exports = app;