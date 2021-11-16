var express = require('express');
var app = module.exports = express();

const path = require('path');

const db = require(path.resolve('Back_end/mysqlDataBaseController')); //get Mysql module

app.get("/CreateAccount", (req,res) => {

res.sendFile(__dirname + '/Create_Account.html')

});

//When request is sent to server /Login
app.post("/CreateAccount", (request,respond) => {

    const {USERNAME_FIELD, PASSWORD_FIELD, PASSWORD_FIELD_REPEAT, EMAIL_FIELD} = request.body;
    
    console.log('Username: ' + USERNAME_FIELD);
    console.log('Password: ' + PASSWORD_FIELD);
    console.log('Password-R: ' + PASSWORD_FIELD_REPEAT);
    console.log('Email: ' + EMAIL_FIELD);
    
    db.createAccount("WEB_LOGIN", USERNAME_FIELD, PASSWORD_FIELD, PASSWORD_FIELD_REPEAT, EMAIL_FIELD,
    (error) => {
        if(error == 1){
            console.log('username already taken');
        }else if(error == 2){
            console.log('password no match');
        }else if(error == 3){
            console.log('username too short');
        }else if(error == 4){
            console.log('password too short');
        }else{
            respond.redirect('/Login');
        }
    });
});

module.exports = app;