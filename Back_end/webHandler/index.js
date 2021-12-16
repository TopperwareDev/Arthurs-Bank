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
const home = require("./Pages/Home");
const lottery = require("./Pages/Lottery");
const blackJack = require("./Pages/BlackJack");
const admin = require("./Pages/Admin");

app.use(login);
app.use(createAccount);
app.use(home);
app.use(lottery);
app.use(blackJack);
app.use(admin);

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