// Web handler index.js
//////////
const port = 3000;
/////////
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require('path');

const app = express();

const { fileURLToPath } = require('url');
const { dirname } = require('path');

// ------ Pages ------
const login = require("./Pages/Login");
const createAccount = require("./Pages/CreateAccount");
const userMenu = require("./Pages/Home");

app.use(login);
app.use(createAccount);
app.use(userMenu);

//public folder
app.use("/Public", express.static('Public')); 
// ------ Pages ------

app.get("/", (req, res) => { // Redirect to login
    res.redirect('/Login')
  });

app.get("*", (req,res) => { // Redirect to PagenotFound if request invalid page
    res.sendFile(path.resolve("Public/Page_Not_Found/Page_Not_Found.html"));
});
app.listen(port); // listening port