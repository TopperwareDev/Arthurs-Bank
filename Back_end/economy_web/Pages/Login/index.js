const bodyParser = require("body-parser");

const express = require('express');
const app = module.exports = express();

const path = require('path');

const db = require(path.resolve('Back_end/mysql')); //get Mysql module

app.use(bodyParser.urlencoded({ extended: true })); 

//When user requests /Login
app.get("/Login", (req,res) => {

res.sendFile(__dirname + '/Login.html')

});

//When request is sent to server /Login
app.post("/Login", (request,respond) => {

const {USERNAME_FIELD, PASSWORD_FIELD} = request.body;

db.verifyLogin('WEB_LOGIN', USERNAME_FIELD, PASSWORD_FIELD, sendPage); 

function sendPage(validation){

    if(validation){
        //first create verification cookie

        //redirect to home page
        respond.redirect('/Home')

        return;
    }else{

        //display incorrect passoword or username message
        console.log("password or username inccorect");

    }

}
});

module.exports = app;