const express = require('express');
const app = module.exports = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const path = require('path');
const authentication = require(path.resolve('Back_end/authentication'));
const mysqlDataBaseController = require(path.resolve('Back_end/mysqlDataBaseController'));
const customMethods = require(path.resolve('Back_end/customMethod'));

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

        //console.log(takenBoxes);

        //respond.json(data);

    });
});

app.post("/Lotery/BuyTickets", (request,respond) => { //validate lotery purchase and update with server

    const purchasedNumbers = new Array();

    const userBuyRequest = request.body.data;

    //console.log(userBuyRequest);

    mysqlDataBaseController.getCollum("WEB_LOGIN", "LOTERY", (result) => {

        //convert all lotery numbers in to array -> not include "null"
        result.forEach(element => {
            //console.log(element.LOTERY);

            if(element.LOTERY != null){

                //if account only has one numbers just add to array
                if(element.LOTERY.split(',').length == 1){
                    //console.log('This user only has one element');

                    purchasedNumbers.push(element.LOTERY);


                }else{ //if account has multople numbers split them and then add to array
                    //console.log('This user has more that one element');

                    element.LOTERY.split(',').forEach(number => {
                        
                        purchasedNumbers.push(number);

                    });

                }
            }
        });

        //check if one of selected elements are already chosen
        customMethods.matchInArays(userBuyRequest.split(','), purchasedNumbers, (matches) => {

            if(matches == 0){ //no lotery numbers have been selected

                //save users lotery number under account name

                console.log('Yes this is free');

            }else{

                //send error message back to user

                console.log('Another use has already bought this element');
            }

        });
    });
});