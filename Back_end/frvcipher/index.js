const mechanism = require("./lib/mechanism.js");
const prompt = require('prompt-sync')({sigint: true});

mechanism.hello();

let name = prompt("message: ");
console.log("hello i am cool : " + name);

/*
function encrypt (message, key) {
  var i = 0;
  mechanism.xyz(message);
  return
};
*/
