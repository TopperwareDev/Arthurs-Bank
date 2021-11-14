var express = require('express');
var app = module.exports = express();

const path = require('path');

const db = require(path.resolve('Back_end/mysql')); //get Mysql module

app.get("/CreateAccount", (req,res) => {

res.sendFile(__dirname + '/Create_Account.html')

});

//When request is sent to server /Login
app.post("/CreateAccount", (request,respond) => {

    const {USERNAME_FIELD, PASSWORD_FIELD, PASSWORD_FIELD_REPEAT} = request.body;
    
    console.log('Username: ' + USERNAME_FIELD);
    console.log('Password: ' + PASSWORD_FIELD);
    console.log('Password-R: ' + PASSWORD_FIELD_REPEAT);
    
    db.createAccount("WEB_LOGIN", USERNAME_FIELD, PASSWORD_FIELD, PASSWORD_FIELD_REPEAT,
    () => {
        if(1){
            console.log('username already taken');
        }else if(2){
            console.log('password no match');
        }


    });

    

    });

module.exports = app;