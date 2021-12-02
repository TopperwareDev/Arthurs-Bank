//This is the custom authenticator

//Standard name for Autentication cookie is : "Authentication"

const express = require('express');
//const cookieParser = require('cookie-parser');

const path = require('path');

const app = express();
//app.use(cookieParser());

const AuthedUsers = require("./lib/Authedusers");

const cookieConfigure = {
    
    maxAge: 1000 * 60 * 10 //Expires after 10 min
    //sameSite: 'none'

};

function Authenticate(username, respond, callback){

    //store authed user with encryption key
    AuthedUsers.AddAuthedUser(username);

    //get key corrsponing with username and save encrypted usename in cookie

    respond.cookie('Authentication', username, cookieConfigure);
    
    callback();
}

function validateCookie(request, callback){

    AuthedUsers.getCookie('Authentication', request, (cookie) => {

        if(cookie){
            AuthedUsers.encryptedUsernameCheck(cookie, (exists) =>{

                console.log('this is called right');
                
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

//remove login in user 
function RemoveAuthedUser(request, respond){ 

    AuthedUsers.getCookie('Authentication', request, (cookie) =>{

        AuthedUsers.GetAuthedUserKey(cookie, (key) => {

            if(key != undefined){

                AuthedUsers.decryptCookie(key, cookie, request, (decrypted) =>{

                    AuthedUsers.RemoveAuthedUser(decrypted);
                    
                    console.log('User: ' + decrypted + ' has just logged out');

                    respond.clearCookie('Authentication');

                    respond.redirect('/Login');// redirect -> login
                });

            }else{
                console.log('Could not find key - authenication -> index.js');
                return;
            }

        });
    })
}

module.exports = {

    Authenticate,
    validateCookie,
    RemoveAuthedUser

};