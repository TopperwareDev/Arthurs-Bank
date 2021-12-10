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

function loteryTakenBoxes(table_name, collum, callback){

  let occupiedLoteyBoxes = new Array();

  //select everything from table
  var sql = "SELECT * FROM " + table_name;

  con.query(sql, function (err, result, fields) {
   if (err) throw err;

   for(row = 0; row != result.length; ++row){

    occupiedLoteyBoxes.push(result[row][collum]);

   }
  });

  callback(occupiedLoteyBoxes);
  return;
}

//con.query("INSERT INTO WEB_LOGIN (USERNAME, PASSWORD, EMAIL, BALANCE) VALUES ('1234', '1234', '1234', '1234')");

module.exports={

  verifyLogin,
  createAccount,
  getValue,
  loteryTakenBoxes

};
