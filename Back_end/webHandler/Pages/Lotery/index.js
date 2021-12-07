const express = require('express');
const app = module.exports = express();

const path = require('path');
const authentication = require(path.resolve('Back_end/authentication'));

// --- lotery configuration -dependant on server ram <--- will reset if server resets
const height = 10;
const width = 10;
//const expireDate = ; // time until winner is selected and reset
// ---

app.get("/Lotery", (request,respond) => {

    authentication.validateCookie(request, (validated) =>{ //Check Authentication cookie

        if(validated){

            respond.sendFile(__dirname + '/Lotery.html');

        }else{

            respond.redirect('/Login');

        }

    });
});

app.get("/Lotery/data", (request,respond) => {

     const data = [
        {height: height, width: width}
    ]
    
    respond.json(data);

});