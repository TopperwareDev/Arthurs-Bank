const express = require('express');
const app = module.exports = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const path = require('path');
const authentication = require(path.resolve('Back_end/authentication'));
const mysqlDataBaseController = require(path.resolve('Back_end/mysqlDataBaseController'));
const customMethods = require(path.resolve('Back_end/customMethod'));

app.get("/Admin", (request,respond) => { // autenticate user and send page

    authentication.validateCookie(request, (validated, username) =>{ //Check Authentication cookie

        if(validated){

            mysqlDataBaseController.getValue2p0('WEB_LOGIN', "ROLE", "USERNAME", username, (rank) => {

                if(rank[0].ROLE == 'ADMIN'){
                    respond.sendFile(__dirname + '/Admin.html');
                }else{
                    respond.redirect('/Home');
                }
                
            });

        }else{

            respond.redirect('/Login');

        }

    });

    //mysqlDataBaseController.deleteTableContents('WEB_LOGIN');

});

app.get("/Admin/lotery_Data", (request,respond) => {

    let takenNumbers = '';
    let participatingUsernames = new Array();

    mysqlDataBaseController.getCollum('WEB_LOGIN', 'USERNAME', (Usernames) => {

        mysqlDataBaseController.getCollum('WEB_LOGIN', 'LOTTERY', (lotteryNumbers) => {

            lotteryNumbers.forEach((element, index) => {
            
                if(element.LOTTERY != 0){

                   takenNumbers = takenNumbers + element.LOTTERY;
                   participatingUsernames.push(Usernames[index].USERNAME);

                }

            });

            const data = {TOTAL_USERS: lotteryNumbers.length, TOTAL_PARTICIPATING_USERS: participatingUsernames.length ,TOTAL_NUMERS: takenNumbers, PARTICIPATING_USERNAMES: participatingUsernames.toString()};

            respond.json(data);

        });
    });

});

app.get("/Admin/lotery_reset", (request,respond) => {

    authentication.validateCookie(request, (validated, username) =>{ //Check Authentication cookie

        if(validated){

           mysqlDataBaseController.resetLotery('WEB_LOGIN', 'LOTTERY', 0)

        }else{

            respond.redirect('/Login');

        }

    });

    respond.json();


});