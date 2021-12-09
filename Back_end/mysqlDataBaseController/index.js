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
     var sql = "INSERT INTO " + table_name + " VALUES ('" + username + "', '" + password + "', '" + email + "', '" + 0 + "')";

      con.query(sql);

      console.log("New account created: " + username);

      callback(69);
      return;

    }
  }
});
}  


function getValue(table_name, rowName0, collumn, callback){

  //select everything from table
  var sql = "SELECT * FROM " + table_name;

  con.query(sql, function (err, result, fields) {
   if (err) throw err;

   for(row = 0; row != result.length; ++row){

      //console.log(result[row].BALANCE);
      //console.log('This is row name' + rowName0);
      //console.log(result[row][0] == rowName0);
      if(result[row].USERNAME == rowName0){
    
        //console.log('This is called');
        callback(result[row].BALANCE); // need to change to stop using .xxxxxxx insead [xxx] so its more flexible
        return;

      
      }
   }
});
}

//con.query("INSERT INTO WEB_LOGIN (USERNAME, PASSWORD, EMAIL, BALANCE) VALUES ('1234', '1234', '1234', '1234')");

module.exports={

  verifyLogin,
  createAccount,
  getValue

};

/*
var sql = "INSERT INTO " + table_name + " VALUES ('example value', 'example value', 'example value', 'example value')";

con.query(sql);

how to insert with out knowing column name

"INSERT INTO WEB_LOGIN VALUES ('example value', 'example value', 'example value', 'example value')

*/