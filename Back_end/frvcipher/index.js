const main = require("./lib/main.js");
const poo = require("./lib/poo.js");

/*x = "Bananer eller dessertbananer är trivialnamn för ätliga bär som härstammar från stora blommande örter inom släktet Musa."
cookie = poo.encrypt(x, 78);
console.log(cookie);
console.log(poo.decrypt(cookie, 78));*/


//Lang fix cyper to use new chars its called "Allowed"

function genkey (){
    key = Math.floor(Math.random() * (310));
    return key;
}

function encrypt (plaintext, key){
    return poo.encrypt(plaintext, key);
}

function decrypt (ciphertext, key){
    return poo.decrypt(ciphertext, key);
}

module.exports={
    genkey,
    encrypt,
    decrypt
  };