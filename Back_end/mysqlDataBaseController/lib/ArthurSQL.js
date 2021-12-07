const express = require('express');
const mysql = require('mysql');

const con_Login_Table = mysql.createConnection({
  host: "db4free.net",
  user: "economyproject",
  password: "123456789",
  database: "economyproject"
});

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
