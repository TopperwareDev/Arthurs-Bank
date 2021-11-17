var express = require('express');
var app = module.exports = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const path = require('path');

const authentication = require(path.resolve('Back_end/authentication')); //get Authenticator module

app.get("/Home", (request,respond) => {
    
    authentication.validateCookie(request, (validated) =>{

        if(validated){

            respond.sendFile(__dirname + '/User_Menu.html');

        }else{

            console.log("A unvalidated user is trying to accses a secure page - Redirecting to homepage");
            respond.redirect('/Login');

        }
        

    });
    
});
