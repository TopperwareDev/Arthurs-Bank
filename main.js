console.log('Starting economy web server');

//import my costom lib
import DisplayHTMLBundle from "./Code/Arthurs_Lib.js";

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
DisplayHTMLBundle(__dirname, './Web-HTML/Login/Login.html', './Web-HTML/Login/Login.css', './Web-HTML/Login/Login.js');


app.listen(port, () => {

  console.log('using the ears on port ' + port)

});
