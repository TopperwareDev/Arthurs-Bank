console.log('Starting economy web server');

import express from "express"; //Call "Express" lib from node_modules

const app = express(); // App - express (When you are calling app it will call the express lib called from above)

// -----------------------------
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('This is the directory name: ' + __dirname);
console.log('This is the file name: ' + __filename);

// ----------------------------- importing lib to assign __filename and __dirname values

const port = 3000; //Port the server listens and send to

//Usefull express commands (GET, PUT, POST, DELETE)
// GET - Get information from frontside
// PUT - Send information to front frontside
// POST - Add information
// DELETE - Remove information

//-----------^^^^^^^^^^------------ setup ----------------------------------------------------------------------------------

//Display Login page
//DisplayHTMLBundle(__dirname, './Web-HTML-Public/Login/Login.html');

//app.get('/', (req, res) => {

  //res.sendFile(path.join(__dirname, "/Web-HTML-Public/Login/Login.html"));
  //res.sendFile('/Users/arthurtoppenberg/Documents/GitHub/Arthurs-Bank/Web-HTML-Public/Login/Login.html');

//});

//app.get('/login.css', (req, res) => {

  //res.sendFile(path.join(__dirname, "/Arthus-Bank/Web-HTML-Public/Login/Login.html"));
  //res.sendFile('/Users/arthurtoppenberg/Documents/GitHub/Arthurs-Bank/Web-HTML-Public/Login/Login.css');

//});


//app.listen(port, () => {

//  console.log('using the ears on port ' + port);
//  console.log(__dirname);

//});

app.use(express.static('Web-HTML-Public'));

app.get("/", (req,res) => {

res.redirect('Login/Login.html');

});

app.get("*", (req,res) => { // Send error if unavaliable page is requested

//res.json("page not found");

res.redirect('/Page_Not_Found/Page_Not_Found.html');

});

app.listen(3000);
