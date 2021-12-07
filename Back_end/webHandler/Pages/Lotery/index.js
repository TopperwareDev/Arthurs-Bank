const express = require('express');
const app = module.exports = express();

const path = require('path');
const authentication = require(path.resolve('Back_end/authentication'));

app.get("/Lotery", (request,respond) => {

    authentication.validateCookie(request, (validated) =>{ //Check Authentication cookie

        if(validated){

            respond.sendFile(__dirname + '/Lotery.html');

        }else{

            respond.redirect('/Login');

        }

    });

});