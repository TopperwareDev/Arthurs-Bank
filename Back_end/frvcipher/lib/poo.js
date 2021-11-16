const set = require("./set.js");

function encrypt (input, key){
    plug = set.poop();
    chars = plug.length;
    text = input.split("");
    length = input.length;
    pt = [];
    for(i = 0; i < length; i++){
        pt [i] = plug.indexOf(text [i]);
    }
    for(i = 0; i < length; i++){
        pt [i] += key;
        pt [i] = (pt [i] + chars) % chars;
    }
    ct = [];
    for(i = 0; i < length; i++){
        ct [i] = plug [pt [i]];
    }
    output = "";
    for(i = 0; i < length; i++){
        output = output.concat(ct[length-1-i]);
    }
    return output;

}
function decrypt (input, key){
    plug = set.poop();
    chars = plug.length;
    text = input.split("");
    length = input.length;
    pt = [];
    for(i = 0; i < length; i++){
        pt [i] = plug.indexOf(text [i]);
    }
    for(i = 0; i < length; i++){
        pt [i] -= key;
        pt [i] = (pt [i] + chars) % chars;
    }
    ct = [];
    for(i = 0; i < length; i++){
        ct [i] = plug [pt [i]];
    }
    output = "";
    for(i = 0; i < length; i++){
        output = output.concat(ct[length-1-i]);
    }
    return output;
}

module.exports={
    encrypt,
    decrypt
  };