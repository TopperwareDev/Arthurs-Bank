const { table } = require('console');
const express = require('express');
const app = module.exports = express();

const path = require('path');
const authentication = require(path.resolve('Back_end/authentication'));
const mysqlDataBaseController = require(path.resolve('Back_end/mysqlDataBaseController'));

app.get("/Lottery", (request,respond) => { // send page

    authentication.validateCookie(request, (validated) =>{ //Check Authentication cookie

        if(validated){

            respond.sendFile(__dirname + '/Lottery.html');

        }else{

            respond.redirect('/Login');

        }

    });
});

app.get("/Lottery/getTableData", (request,respond) => { //send data to user

    //get all taken boxes
    mysqlDataBaseController.lotteryTakenBoxes('WEB_LOGIN', "LOTTERY", (takenBoxes) => {

        console.log(takenBoxes);

        //respond.json(data);

    });
});

app.post("/Lottery", (request,respond) => { //update user selected boxes

    const {LOTTERY_BOXES} = request.body;



});