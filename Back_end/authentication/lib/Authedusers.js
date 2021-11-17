var AuthedUsers = new Array();

function AddAuthedUser(username, frvcipher){

//generate encryption key
key = frvcipher.genkey();

//save username + Key "for now no key will be used"
AuthedUsers.push(username + " " + key);

}

function RemoveAuthedUser(username){

for(i = 0; i < AuthedUsers.length; ++i){

    if(AuthedUsers[i].split(" ")[0] == username){
        AuthedUsers.splice(i,1);

    }
}

}

function GetAuthedUserKey(username){

    for(i = 0; i != AuthedUsers.length; ++i){
        if(AuthedUsers[i].split(" ")[0] == username){
            
            var username_Key = AuthedUsers[i].split(" "); //this will split the string at every space

            return username_Key[1]; // read seccond element in arry
        }
    }
}
//Make method to dycrypt and return username

module.exports = {

AddAuthedUser,
RemoveAuthedUser,
GetAuthedUserKey

}