const express = require("express");
const mySql_Lib_C = require("./Custom_Modules/mysql"); //database manager module
const web_requests = require("./Custom_Modules/web_requests"); //request handlet module

const app = express();

const { fileURLToPath } = require('url');
const { dirname } = require('path');

//Pages -----------------------
const Login = require('./Pages/Login')
const CreateAccount = require('./Pages/CreateAccount')
const UserMenu = require('./Pages/UserMenu')

app.use(Login);
app.use(CreateAccount);
app.use(UserMenu);
//Pages -----------------------
