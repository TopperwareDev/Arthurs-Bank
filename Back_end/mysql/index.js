
//Database index file

//const express = require('express');
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "db4free.net",
  user: "economyproject",
  password: "123456789",
  database: "economyproject"
});

con.connect(function(error) {
  if(!!error) {
    console.log("failed - Database is most likely down");
  }else{
    console.log('Connection to database succsesfull');
  }
});

function readTable(table_name, columns){

  //var sql = "Select * from " + table_name;
  var sql = "SELECT COUNT(*) FROM " + table_name;

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    //var data = JSON.parse(result);
    console.log(result);
  });
}

module.exports={

  readTable

};