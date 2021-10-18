import express from "express"; //Call "Express" lib from node_modules

const app = express(); // App - express (When you are calling app it will call the express lib called from above)

export default function DisplayHTMLBundle(dirname, HtmlFileLocation){

  app.get("/html", (req, res) => {
    res.sendFile(HtmlFileLocation, { root: __dirname });
    console.log('sent html file');
  });

}
