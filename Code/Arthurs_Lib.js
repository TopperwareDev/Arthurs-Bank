import express from "express"; //Call "Express" lib from node_modules

const app = express(); // App - express (When you are calling app it will call the express lib called from above)

// ----------------------------- importing lib to assign __filename and __dirname values

const port = 3000; //Port the server listens and send to

//Usefull express commands (GET, PUT, POST, DELETE)
// GET - Get information from frontside
// PUT - Send information to front frontside
// POST - Add information
// DELETE - Remove information


export default function DisplayHTMLBundle(dirname, HtmlFileLocation, CssFileLocation, JsFileLocation){

  app.get("/", (req, res) => {
    res.sendFile(HtmlFileLocation, { root: __dirname });
  });

  app.get("/javascript", (req, res) => {
    res.sendFile(JsFileLocation, { root: __dirname });
  });

}
