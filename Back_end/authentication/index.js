//This is the custom authenticator

//Standard name for Autentication cookie is : "Authentication"

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

const AuthedUsers = require("./lib/Authedusers");

const cookieConfigure = {
    
    maxAge: 1000 * 60 * 30 //Expires after 30 min

};

function addAuthenticated(username, respond, callback){

    //store authed user with encryption key
    AuthedUsers.AddAuthedUser(username);

    //encrypt cookie with key
    console.log(AuthedUsers.GetAuthedUserKey(username)); // display key

    var encryptedUsername = username; // add encrytion here

    //save cookie on client
    respond.cookie('Authentication', encryptedUsername, cookieConfigure);

    callback();
}

function validateCookie(encryptedCookie, callback){




}

module.exports = {

    addAuthenticated,
    validateCookie

};