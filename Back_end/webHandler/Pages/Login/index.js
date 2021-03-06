const bodyParser = require("body-parser");

const express = require('express');
const app = module.exports = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const path = require('path');

const db = require(path.resolve('Back_end/mysqlDataBaseController')); //get Mysql module
const authentication = require(path.resolve('Back_end/authentication')); //get Authenticator module

app.use(bodyParser.urlencoded({ extended: true })); 

//When user requests /Login
app.get("/Login", (request,respond) => {

    authentication.validateCookie(request, (validated) =>{ //if the user is validated and visits login redirect to homepage

        if(validated){

            respond.redirect('/home');

        }else{

            respond.sendFile(__dirname + '/Login.html');

        }

    });
    

    //respond.sendFile(__dirname + '/Login.html');
});

//When request is sent to server /Login
app.post("/Login", (request,respond) => {

const {USERNAME_FIELD, PASSWORD_FIELD} = request.body;

db.verifyLogin('WEB_LOGIN', USERNAME_FIELD, PASSWORD_FIELD, (validation) =>{
    
    if(validation){
        //first create verification cookie
        authentication.Authenticate(USERNAME_FIELD, respond,() => {
        
            //redirect to home page
            respond.redirect('/Home')

            return;

        });
    }else{

        //display incorrect passoword or username message
        console.log("password or username inccorect");

    }
}); 

});

module.exports = app;