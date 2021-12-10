const { table } = require('console');
const express = require('express');
const app = module.exports = express();

const path = require('path');
const authentication = require(path.resolve('Back_end/authentication'));
const mysqlDataBaseController = require(path.resolve('Back_end/mysqlDataBaseController'));

app.get("/Lotery", (request,respond) => { // send page

    authentication.validateCookie(request, (validated) =>{ //Check Authentication cookie

        if(validated){

            respond.sendFile(__dirname + '/Lotery.html');

        }else{

            respond.redirect('/Login');

        }

    });
});

app.get("/Lotery/getTableData", (request,respond) => { //send data to user

    //get all taken boxes
    mysqlDataBaseController.loteryTakenBoxes('WEB_LOGIN', "LOTERY", (takenBoxes) => {

        console.log(takenBoxes);

        //respond.json(data);

    });
});

app.post("/Lotery", (request,respond) => { //update user selected boxes



});