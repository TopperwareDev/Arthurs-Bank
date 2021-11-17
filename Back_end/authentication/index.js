//This is the custom authenticator

//Standard name for Autentication cookie is : "Authentication"

const express = require('express');
//const cookieParser = require('cookie-parser');

const path = require('path');

const app = express();
//app.use(cookieParser());

const AuthedUsers = require("./lib/Authedusers");
const frvcipher = require(path.resolve('Back_end/frvcipher'));

const cookieConfigure = {
    
    maxAge: 1000 * 60 * 10, //Expires after 30 min
    sameSite: 'none'

};

function Authenticate(username, respond, callback){

    //store authed user with encryption key
    AuthedUsers.AddAuthedUser(username, frvcipher);

    //get key corrsponing with username and save encrypted usename in cookie

    respond.cookie('Authentication', username, cookieConfigure);
    
    callback();
}

function validateCookie(request, callback){

    AuthedUsers.getCookie('Authentication', request, (cookie) => {

        if(cookie){
            AuthedUsers.encryptedUsernameCheck(cookie, frvcipher, (exists) =>{

                if(exists){
                    
                    callback(true);
                    return;
        
                }else{

                    callback(false);
                    return;

                }
        
            });

        }else{

            callback(false);
            return;

        }
    });
}

module.exports = {

    Authenticate,
    validateCookie

};