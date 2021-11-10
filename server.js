const express = require("express");
const mySql_Lib_C = require("./Custom_Modules/mysql"); //database manager module
const web_requests = require("./Custom_Modules/web_requests"); //request handlet module

const app = express();

const { fileURLToPath } = require('url');
const { dirname } = require('path');

//app.use(web_requests);

//-------
