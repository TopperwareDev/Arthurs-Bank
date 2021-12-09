const { table } = require('console');
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

app.get("/Lotery/data", (request,respond) => { //make user request this every 30 sec -> cuz it will stess the server too much

    //check each username for data



    // example
    let tableData = new Array();
   
    console.log(tableData);
    
    //respond.json(data);

});