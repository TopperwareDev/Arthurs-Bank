import express from "express"; //Call "Express" lib from node_modules

import session from "express-session";

import bodyParser from "body-parser";

const app = express(); // App - express (When you are calling app it will call the express lib called from above)

// -----------------------------
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//console.log('This is the directory name: ' + __dirname);
//console.log('This is the file name: ' + __filename);

// ----------------------------- importing lib to assign __filename and __dirname values

const {
  //port server listens on
  port = 3000, //Port the server listens and send to
  //name for cookie
  cookie_Name = 'verification-sid',
  cookie_Time_Limit = 1000* 60 * 60, // one hour in ms
  secret_Code = 'thefishisascaryonedummies/.,,!@^#&*()'

} = process.env

app.use(bodyParser.urlencoded({ //to be able to accses sent forms from client

  extended: true,

}));

app.use(session({ // Set up cookie
  //custom name for cookies
  name: cookie_Name,
  resave: false,
  saveUninitalized: false, //do not store cookies with no data
  secret: secret_Code, // encryption
    cookie: {
      // Time befor cookie exprires
      maxAge: cookie_Time_Limit,
      // Server will only read cookies from the same site
      sameSite: true,
      secure: false, // change when building final version -----

    }
}));

console.log('You have started the server');
console.log('The server is listening on port: ' + port);

//-----------^^^^^^^^^^------------ setup ----------------------------------------------------------------------------------

app.use("/Public", express.static('Public'));

app.get("/", (req,res) => { // Redirect to login

    req.session.name = 'hahaha'; //write to cookie

    console.log(req.session);

    console.log('reading cookie: ' + req.session.name); // read to cookie

res.redirect('/Login');

});

app.get("/Login", (req,res) => {

res.sendFile(__dirname + '/Code/Html/Login.html')

});

app.post("/Login", (request,respond) => {

const {USERNAME_FIELD, PASSWORD_FIELD} = request.body;

//console.log('This is the password '  + USERNAME_FIELD + ' This is the passowrd ' + PASSWORD_FIELD);

if(USERNAME_FIELD == "admin" && PASSWORD_FIELD == "1234")

    respond.redirect('/Home-Authenticated')

});

app.get("/CreateAccount", (req,res) => {

res.sendFile(__dirname + '/Code/Html/Create_Account.html')

});

app.get("/Home-Authenticated", (req,res) => {

res.sendFile(__dirname + '/Code/Html/User_Menu.html')

});

app.get("*", (req,res) => { // Send error if unavaliable page is requested

res.sendFile(__dirname + '/Code/Html/Page_Not_Found.html')

});

app.listen(port);
