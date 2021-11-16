const mech = require("./mech.js");
const set = require("./set.js");

function cipher (input, key){
  plug = set.abc();
  chars = plug.length;
  base = set.nums(plug.length);
  console.log(base);

  rotors = [
    mech.rotor(base,13),
    mech.rotor(base,23),
    mech.rotor(base,43),
    mech.rotor(base,53),
    mech.rotor(base,73),
    mech.rotor(base,83),
    mech.rotor(base,103),
    mech.rotor(base,113),
  ];
  r = 8;
  console.log(rotors);

  zero = [r/2];
  for(i = 0; i < r/2; i++){
    zero[i] = rotors [2*i][0];
  }
  console.log(zero);
  /*
  if(!Mech.haschar(input, plug)){
    console.log("invalid character detected");
    return null;
  }
  */
  length = input.length;
  console.log(length);
    
  text = input.split("");
  console.log(text);
  console.log("key: " + key);
  pos = mech.positions(key, r, chars);
  console.log("start: " + pos);

  for(i = 0; i < rotors/2; i++){
    rotor[2*i] = Mech.shift(rotor[2*i], pos[i]);
    rotor[2*i+1] = Mech.shift(rotor[2*i+1], pos[i]);
}

  for(i = 0; i < 1; i++) {
    c = mech.findIndex(plug, text[i]);
    console.log(c)
    for(j = 0; j < r; j += 2) {
        c = rotors [j][c];
        console.log(c)
        c = mech.findIndex(rotors[j+1], c);
        console.log(c)
    }
    c = chars-1-c;
    console.log(c)
    for(j = 7; j > 0; j -= 2){
        c = rotors [j][c];
        console.log(c)
        c = mech.findIndex(rotors[j-1], c);
        console.log(c)
    }
    text [i] = plug [c];
  }

  return text;
}
module.exports={
  cipher
};