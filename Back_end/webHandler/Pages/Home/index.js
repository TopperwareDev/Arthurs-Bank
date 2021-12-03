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

            respond.redirect('/Login');

        }
        

    });
    
});

app.post("/logout", (request, respond) => {

    console.log('a post was requested');

    authentication.RemoveAuthedUser(request, respond);

});

//all data sent to home - username, ballance
app.get("/Home/data", (request,respond) => {

    const data = [
        {username: 'kaan', balance: '69420'}
    ]
    
    respond.json(data);
    
});
