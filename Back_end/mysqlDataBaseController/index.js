//const express = require('express');
const mysql = require('mysql');

const querryFunctions = require("./lib/querryFunctions");

const con = mysql.createConnection({
  host: "db4free.net",
  user: "economyproject",
  password: "123456789",
  database: "economyproject"
});

con.connect(function(error) {
  if(!!error) {
    console.log("Database: failed");
  }else{
    console.log('Database: good');
  }
});

function verifyLogin(table_name, username, password, callback){

  //select everything from table
  var sql = "SELECT * FROM " + table_name;

  con.query(sql, function (err, result, fields) {
    if (err) throw err;

    //console.log("This is the inputed username: " + username);
    //console.log("This is the inputed password: " + password);

    for(row = 0; row != result.length; ++row){
    
      if(result[row].USERNAME == username && result[row].PASSWORD == password){
        
        callback(true);
        return;
      }
    }
    callback(false);
    return;
  });
}

function createAccount (table_name, username, password, password_Repeat, email, callback) {
   /*
    if return is nothing, then all went well and new account is saved
    if return is 1 -> username is unavaliable
    if return is 2 -> password is unavaliable
    if return is 3 -> username is too short
    if return is 4 -> password is too short

    if return is 69 -> succses create user
   */

  querryFunctions.match("WEB_LOGIN", 'USERNAME', username, (dupecheck) => {

  if(dupecheck){

    //username is taken
    callback(1);
    return;
     
  }else{

    //check is 'password' is valid
    if(password.length < 4){

      callback(4);
      return;

    }else if(!(password == password_Repeat)){

      callback(2);
      return;

    }else if(username.length < 4){

      callback(3);
      return;

    }else{
    
      //enter new account into sql database
     var sql = "INSERT INTO " + table_name + " VALUES ('" + username + "', '" + password + "', '" + email + "', '" + 0 + "', '" + 0 + "')";

      con.query(sql);

      console.log("New account created: " + username);

      callback(69);
      return;

    }
  }
});
}  

function getValue(table_name, identifyer, identifyerCollumName, collumName,  callback){

  //select everything from table
  var sql = "SELECT * FROM " + table_name;

  con.query(sql, function (err, result, fields) {
   if (err) throw err;

   for(row = 0; row != result.length; ++row){

      if(result[row][identifyerCollumName] == identifyer){
    
        callback(result[row][collumName]); 
        return;

      
      }
   }
});
}

function lotteryTakenBoxes(table_name, collum, callback){

  let occupiedLoteyBoxes = new Array();

  getCollum(table_name, collum, (result) => {

    //convert all lottery numbers in to array -> not include "null"
    result.forEach(element => {
        //console.log(element.LOTTERY);

        if(element.LOTTERY != null){

            //if account only has one number just add to array
            if(element.LOTTERY.split(',').length == 1){
                //console.log('This user only has one element');

                occupiedLoteyBoxes.push(element.LOTTERY);


            }else{ //if account has multople numbers split them and then add to array
                //console.log('This user has more that one element');

                element.LOTTERY.split(',').forEach(number => {
                    
                  occupiedLoteyBoxes.push(number);

                });

            }
        }
    });

  callback(occupiedLoteyBoxes);
  });
}

//function will search data base for specific value
function getValue2p0(table_name, collumToGet, searchCollum, searchValue, callback){

  var sql = "SELECT " + collumToGet + " FROM " + table_name + " WHERE " + searchCollum + " = " + "'" + searchValue + "'";
  //var sql = "SELECT " + collumToGet + " FROM " + table_name + " WHERE " + searchValue + " = " + searchCollum;

  con.query(sql, function (err, result, fields){

    if (err) throw err;

    callback(result);

  });

}

function getCollum(table_name, collum, callback){

  const sql = "SELECT " + collum + " FROM " + table_name;

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
 
    //make sure your script can read json -> may have to import package
    callback(result);

   });
};

function editValue(table_name, collum, value, searchCollum, searchValue){

  const sql = "UPDATE " + table_name + " SET " + collum + " = " + "'" + value + "'" + " WHERE " + searchCollum + " = " + "'" + searchValue + "'";

  con.query(sql);

}

function deleteTableContents(table_name){

  const sql = 'DELETE FROM ' + table_name;

  con.query(sql);

}

module.exports={

  verifyLogin,
  createAccount,
  getValue,
  lotteryTakenBoxes,
  getValue2p0,
  getCollum,
  editValue,
  deleteTableContents

};
