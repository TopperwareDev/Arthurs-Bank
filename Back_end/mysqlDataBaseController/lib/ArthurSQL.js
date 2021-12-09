const express = require('express');
const mysql = require('mysql');

const con_Login_Table = mysql.createConnection({
  host: "db4free.net",
  user: "economyproject",
  password: "123456789",
  database: "economyproject"
});

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

function match(table_name, collum, value, callback){

//select everything from table
var sql = "SELECT * FROM " + table_name;

con.query(sql, function (err, result, fields) {
 if (err) throw err;
 //console.log(result);

 for(row = 0; row != result.length; ++row){

   //need to change so match work on any row name ---------------------------
   if(result[row][collum] == value){

      callback(true);
      return;
    }
 }
 callback(false);
 return false;
});
}

module.exports = {

  getValue,
  match

};




/*
con_Login_Table.connect(function(error) {
if(!!error) {
  console.log("failed");
}else{
  console.log("Connection succsesfull");

  var sql = "INSERT INTO WEB_LOGIN (USERNAME, PASSWORD, EMAIL, BALANCE) VALUES ('LAng', 'sdfksjdfskdfskfd 37','lnagisb','gggg')";
  con_Login_Table.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}
});
*/
