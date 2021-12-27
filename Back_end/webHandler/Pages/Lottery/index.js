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

            respond.redirect(307, '/home');

        }

    });

    //mysqlDataBaseController.deleteTableContents('WEB_LOGIN');

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

    mysqlDataBaseController.getCollum("WEB_LOGIN", "LOTTERY", (result) => {

        mysqlDataBaseController.lotteryTakenBoxes('WEB_LOGIN', 'LOTTERY', (allTakenLotteryNumbers) => { //return all taken lottery boxes

            //check if one of selected elements are already chosen
            customMethods.matchInArays(userBuyRequest.split(','), allTakenLotteryNumbers, (matches) => {

                if(matches == 0){ //no taken lottery numbers selected

                //save users lottery number under account name

                //get username
                    authentication.validateCookie(request, (exists, username) => {
                        console.log(username);

                        //get users previous lottery numbers
                        mysqlDataBaseController.getValue2p0('WEB_LOGIN', "LOTTERY", "USERNAME", username, (previosLotteryNumbers) => {

                            console.log(previosLotteryNumbers[0].LOTTERY);
                         if(previosLotteryNumbers[0].LOTTERY == 0){ //if user does not have previous lotery numbers

                          cleanUp(userBuyRequest, (cleaned) => {

                              mysqlDataBaseController.editValue('WEB_LOGIN', 'LOTTERY', cleaned + ',', "USERNAME", username);

                         });

                        }else{ //if user already has numbers

                         cleanUp(previosLotteryNumbers[0].LOTTERY, (cleaned1) => {

                                cleanUp(userBuyRequest, (cleaned2) => {

                                    console.log(cleaned2);

                                   mysqlDataBaseController.editValue('WEB_LOGIN', 'LOTTERY', cleaned1 + cleaned2 + ',', "USERNAME", username);

                               });
                         });

                        }
                        });

                        //remove all extra spaces and 0 in user lottery numbers
                        function cleanUp(list, callback){

                            var array = new Array();

                            console.log('This is the input for cleanup' + list);

                            //split list into array and remove all elements with 0 or space
                           list.split(',').forEach(element => { 
                            
                               if(!(element == '0' || element == '')){
                                   array.push(element+',');
                               }

                           });

                          callback(array);

                        }

                });

            }else{

                //send error message back to user

                //console.log('Another use has already bought this element');

                 //if user is manages to click button before it is dissabled it will just refresh page
                 console.log('There has been an error in the lottery page -> this might be a user messing with javascript in browser');

            }

        });
    });
});
});