const express = require('express');
const app = module.exports = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const path = require('path');
const authentication = require(path.resolve('Back_end/authentication'));
const mysqlDataBaseController = require(path.resolve('Back_end/mysqlDataBaseController'));
const customMethods = require(path.resolve('Back_end/customMethod'));

app.get("/Admin", (request,respond) => { // send page

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

});