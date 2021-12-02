//This is the custom authenticator
//Standard name for Autentication cookie is : "Authentication"

const salt = 4.39827238945;

const express = require('express');
const bcrypt = require('bcrypt');

const path = require('path');

const app = express();

const AuthedUsers = require("./lib/Authedusers");

const cookieConfigure = {
    
    maxAge: 1000 * 60 * 10 //Expires after 10 min
    //sameSite: 'none'

};

async function Authenticate(username, respond, callback){

    //store authed user with encryption key
    AuthedUsers.AddAuthedUser(username);

    //encrypt the usename
    const encryptedUsername = await bcrypt.hash(username, salt);

    respond.cookie('Authentication', encryptedUsername, cookieConfigure);
    
    callback();
}

function validateCookie(request, callback){

    AuthedUsers.getCookie('Authentication', request, (cookie) => {

        if(cookie){
            AuthedUsers.encryptedUsernameCheck(cookie, bcrypt, (exists) =>{
                
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

//log out user
function RemoveAuthedUser(request, respond){ 

    AuthedUsers.getCookie('Authentication', request, (cookie) =>{

        AuthedUsers.encryptedUsernameCheck(cookie, bcrypt, (exists, username) =>{

            if(exists){

                AuthedUsers.RemoveAuthedUser(username);

                console.log('User: ' + username + ' has just logged out');

                //clear Authentication cookie
                respond.clearCookie('Authentication');

            }else{
                // if cookie cannot be authenticated 
                console.log('User does not exist-> authentication/index.js');
            }

        });

        /*
        AuthedUsers.GetAuthedUserKey(cookie, (key) => {

            if(key != undefined){

                AuthedUsers.decryptCookie(key, cookie, request, (decrypted) =>{

                    AuthedUsers.RemoveAuthedUser(decrypted);
                    
                    console.log('User: ' + decrypted + ' has just logged out');

                    respond.clearCookie('Authentication');

                    //respond.redirect('/Login');// redirect -> login
                });

            }else{
                console.log('Could not find key - authenication -> index.js');
                return;
            }

        });

        */

    })
}

module.exports = {

    Authenticate,
    validateCookie,
    RemoveAuthedUser

};