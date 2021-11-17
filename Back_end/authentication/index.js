//This is the custom authenticator

//Standard name for Autentication cookie is : "Authentication"

const express = require('express');
const cookieParser = require('cookie-parser');

const path = require('path');

const app = express();
app.use(cookieParser());

const AuthedUsers = require("./lib/Authedusers");
const frvcipher = require(path.resolve('Back_end/frvcipher'));

const cookieConfigure = {
    
    maxAge: 1000 * 60 * 30 //Expires after 30 min

};

function addAuthenticated(username, respond, callback){

    //store authed user with encryption key
    AuthedUsers.AddAuthedUser(username, frvcipher);

    //encrypt cookie with key and save cookie on client
    
    console.log("This is the encrypted username " + frvcipher.encrypt(username, AuthedUsers.GetAuthedUserKey(username)));
    
    //respond.cookie('Authentication', frvcipher.encrypt(username, AuthedUsers.GetAuthedUserKey(username, cookieConfigure)));
    respond.cookie('Authentication', 'I┘░И');
    callback();
}

function validateCookie(request, callback){

    //console.log(request.cookies.Authentication);

    username = '1234';

    console.log("This is the decrypted username " + frvcipher.decrypt(request.cookies.Authentication, AuthedUsers.GetAuthedUserKey(username)));

    callback();

}

module.exports = {

    addAuthenticated,
    validateCookie

};