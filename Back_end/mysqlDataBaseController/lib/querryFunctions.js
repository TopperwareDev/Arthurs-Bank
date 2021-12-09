const express = require('express');
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "db4free.net",
  user: "economyproject",
  password: "123456789",
  database: "economyproject"
});

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
