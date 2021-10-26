console.log('Starting economy web server');

import express from "express"; //Call "Express" lib from node_modules

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

} = process.env

app.use(bodyParser.urlencoded({ //to be able to accses sent forms from client

  extended: true

}));

//-----------^^^^^^^^^^------------ setup ----------------------------------------------------------------------------------

app.use(express.static('Public'));

app.get("/Home", (req,res) => {

res.sendFile(__dirname + '/Code/Html/User_Menu.html')

});

//app.get("*", (req,res) => { // Send error if unavaliable page is requested

//res.redirect('/Page_Not_Found/Page_Not_Found.html');

//});

app.listen(port);
