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

        //console.log(takenBoxes);

        //respond.json(data);

    });
});

app.post("/Lottery/BuyTickets", (request,respond) => { //validate lottery purchase and update with server

    const purchasedNumbers = new Array();

    const userBuyRequest = request.body.data;

    //console.log(userBuyRequest);

    mysqlDataBaseController.getCollum("WEB_LOGIN", "LOTTERY", (result) => {

        //convert all lottery numbers in to array -> not include "null"
        result.forEach(element => {
            //console.log(element.LOTTERY);

            if(element.LOTTERY != null){

                //if account only has one numbers just add to array
                if(element.LOTTERY.split(',').length == 1){
                    //console.log('This user only has one element');

                    purchasedNumbers.push(element.LOTTERY);


                }else{ //if account has multople numbers split them and then add to array
                    //console.log('This user has more that one element');

                    element.LOTTERY.split(',').forEach(number => {
                        
                        purchasedNumbers.push(number);

                    });

                }
            }
        });

        //check if one of selected elements are already chosen
        customMethods.matchInArays(userBuyRequest.split(','), purchasedNumbers, (matches) => {

            if(matches == 0){ //no lottery numbers have been selected

                //save users lottery number under account name

                console.log('Yes this is free');

            }else{

                //send error message back to user

                console.log('Another use has already bought this element');
            }

        });
    });
});