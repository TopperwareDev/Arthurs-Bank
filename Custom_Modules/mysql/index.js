
const express = require('express');
const mysql = require('mysql');

const con_Login_Table = mysql.createConnection({
  host: "db4free.net",
  user: "economyproject",
  password: "123456789",
  database: "economyproject"
});

con_Login_Table.connect(function(error) {
  if(!!error) {
    console.log("failed - Database is most likely down");
  }else{
    console.log('Connection to database succsesfull');
  }
});
