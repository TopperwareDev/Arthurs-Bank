//import express from "express"; //Call "Express" lib from node_modules
const express = require("express");

//import bodyParser from "body-parser";
const bodyParser = require("body-parser");

//import cookieParser from "cookie-parser";
const cookieParser = require("cookie-parser");

//import Handler from "./Code/NodeJavaScript/Handler.js";
//var myFunctions = require("./Code/NodeJavaScript/Handler.js")

const app = express(); // App - express (When you are calling app it will call the express lib called from above)

// -----------------------------
//import { fileURLToPath } from 'url';
const { fileURLToPath } = require('url');

//import { dirname } from 'path';
const { dirname } = require('path');

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
//console.log('This is the directory name: ' + __dirname);
//console.log('This is the file name: ' + __filename);

// ----------------------------- importing lib to assign __filename and __dirname values

const {
  //port server listens on
  port = 3000, //Port the server listens and send to
  //name for cookie
  cookie_Name = 'verification-sid',
  cookie_Time_Limit = 1000 * 60 * 60, // one hour in ms
  key = 'happy'

} = process.env

app.use(bodyParser.urlencoded({ extended: true })); //to be able to accses sent forms from client
app.use(cookieParser());

//Make Public folder accsesable to the public
app.use("/Public", express.static('Public'));

//--//
//res.clearCookie('name'); // clear cookie
//res.cookie('name', 'text'); //writing cookie
//req.cookies.name

app.get("/Login", (req,res) => {

res.sendFile(__dirname + '/Code/Html/Login.html')

});

app.post("/Login", (request,respond) => {

const {USERNAME_FIELD, PASSWORD_FIELD} = request.body;

//console.log('This is the password '  + USERNAME_FIELD + ' This is the passowrd ' + PASSWORD_FIELD);

if(USERNAME_FIELD == "admin" && PASSWORD_FIELD == "1234")

    respond.redirect('/Home')

});

app.get("/CreateAccount", (req,res) => {

res.sendFile(__dirname + '/Code/Html/Create_Account.html')

});

app.get("/Home", (req,res) => {

res.sendFile(__dirname + '/Code/Html/User_Menu.html')

});

app.get("*", (req,res) => { // Send error if unavaliable page is requested

res.sendFile(__dirname + '/Code/Html/Page_Not_Found.html')

});

//myFunctions.method();
require('./Code/NodeJavaScript/Handler.js')(app);

app.listen(port);
