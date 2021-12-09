var express = require('express');
var app = module.exports = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const path = require('path');

const authentication = require(path.resolve('Back_end/authentication')); //get Authenticator module
const mysqlController = require(path.resolve('Back_end/mysqlDataBaseController')); //get ArthurSQL module

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

//respond with data for homepage ->  username, ballance
app.get("/Home/data", (request,respond) => {

    //get username
    authentication.getUsername(request, (username) =>{

         //get ballance
         mysqlController.getValue('WEB_LOGIN', username, 'USERNAME', 'BALANCE',(bal) => {

            const data = [
                {username: username, balance: bal}
            ]
            
            respond.json(data);

         });
    });
});

