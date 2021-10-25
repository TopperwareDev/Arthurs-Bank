console.log('Starting economy web server');

import express from "express"; //Call "Express" lib from node_modules

import session from "express-session";

import bodyParser from "body-parser";

const app = express(); // App - express (When you are calling app it will call the express lib called from above)

// -----------------------------
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('This is the directory name: ' + __dirname);
console.log('This is the file name: ' + __filename);

// ----------------------------- importing lib to assign __filename and __dirname values

const {

  port = 3000, //Port the server listens and send to

  User_Session_Life = (1000 * 60 * 10), //10 min

  Session_Name = 'sid',

  Session_Secret = 'ILikeApples'

} = process.env

  app.use(session({
    name: Session_Name,
    resave: false,
    saveUninitialized: false,
    secret: Session_Secret,
    cookie: {
      maxAge: User_Session_Life,
      sameSite: true,
      secure: false
    }
  }));

app.use(bodyParser.urlencoded({ //to be able to accses sent forms from client

  extended: true

}));


//-----------^^^^^^^^^^------------ setup ----------------------------------------------------------------------------------

app.use(express.static('Web-HTML-Public'));

//app.get("/", (req,res) => {

//res.redirect('Login/Login.html');

//});

app.get('/Login', (request, respond) => {

respond.sendFile('Web-HTML-Public/Login/Login.html', { root: __dirname });

});

app.get('/Register', (request, respond) => {

respond.sendFile('Login.html', { root: __dirname });

});

app.get('/Home', (request, respond) => {

respond.sendFile('Login.html', { root: __dirname });

});

app.get("*", (req,res) => { // Send error if unavaliable page is requested

res.redirect('/Page_Not_Found/Page_Not_Found.html');

});

app.listen(port);
