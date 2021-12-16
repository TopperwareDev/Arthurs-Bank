const express = require('express');
const app = module.exports = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const path = require('path');
const authentication = require(path.resolve('Back_end/authentication'));
const mysqlDataBaseController = require(path.resolve('Back_end/mysqlDataBaseController'));
const customMethods = require(path.resolve('Back_end/customMethod'));

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

        authentication.getUsername(request, (username) => {

            mysqlDataBaseController.getValue2p0("WEB_LOGIN", "LOTTERY", "USERNAME", username, (usersLotteryNumbers) => {

                const data = {takenLotteryNumbers: takenBoxes.toString(), usersBoxes: usersLotteryNumbers[0].LOTTERY};

                respond.json(data);

            });
        });
    });
});

app.post("/Lottery/BuyTickets", (request,respond) => { //validate lottery purchase and update with server

    //what use wants to buy
    const userBuyRequest = request.body.data;

    //console.log(userBuyRequest);

    mysqlDataBaseController.getCollum("WEB_LOGIN", "LOTTERY", (result) => {

        mysqlDataBaseController.lotteryTakenBoxes('WEB_LOGIN', 'LOTTERY', (allTakenLotteryNumbers) => { //return all taken lottery boxes

            //check if one of selected elements are already chosen
        customMethods.matchInArays(userBuyRequest.split(','), allTakenLotteryNumbers, (matches) => {

            if(matches == 0){ //no lottery numbers have been selected

                //save users lottery number under account name

                //get username
                authentication.validateCookie(request, (exists, username) => {

                    //get users previous lottery numbers
                    mysqlDataBaseController.getValue2p0('WEB_LOGIN', "LOTTERY", "USERNAME", username, (previosLotteryNumbers) => {

                       if(previosLotteryNumbers[0].LOTTERY == 0){

                        mysqlDataBaseController.editValue('WEB_LOGIN', 'LOTTERY', userBuyRequest + ',', "USERNAME", username);

                       }else{

                        mysqlDataBaseController.editValue('WEB_LOGIN', 'LOTTERY', previosLotteryNumbers[0].LOTTERY + userBuyRequest + ',', "USERNAME", username);

                       }
                    });
                });

            }else{

                //send error message back to user

                //console.log('Another use has already bought this element');

                //if user is manages to click button before it is dissabled it will just refresh page
                res.redirect('back');
            }

        });
    });
});
});