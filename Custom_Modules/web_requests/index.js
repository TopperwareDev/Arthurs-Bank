const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

app.use("/Public", express.static('Public')); // Make public folder public

app.get("/", (req,res) => { // Redirect to login
res.redirect('/Login')
});
app.get("*", (req,res) => { // Redirect to PagenotFound if request invalid page
res.sendFile(__dirname + '/Public/Page_Not_Found/Page_Not_Found.html')
});

app.listen(3000); // Which port server listens to
