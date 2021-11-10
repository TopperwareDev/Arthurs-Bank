const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const Login = require('Pages/Login');
const CreateAccount = require('Pages/CreateAccount');
const UserMenu = require('Pages/UserMenu');