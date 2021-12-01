var AuthedUsers = new Array();

function AddAuthedUser(username, frvcipher){

//generate encryption key
key = frvcipher.genkey();

//save username + Key "for now no key will be used" and clear pre existing ones
RemoveAuthedUser(username);

AuthedUsers.push(username + " " + key);

//console.log(AuthedUsers);

}

function RemoveAuthedUser(username){

for(i = 0; i < AuthedUsers.length; ++i){

    if(AuthedUsers[i].split(" ")[0] == username){
        
        AuthedUsers.splice(i,1);

    }
}

}

function GetAuthedUserKey(encryptedUsername, callback){

    for(i = 0; i != AuthedUsers.length; ++i){
        if(AuthedUsers[i].split(" ")[0] == encryptedUsername){
            
            var username_Key = AuthedUsers[i].split(" "); //this will split the string at every space

            callback(username_Key[1]);// read seccond element in arry
            return; 
        }
    }
}

function encryptedUsernameCheck(encyptedUsername, frvcipher, callback){

    for(i = 0; i != AuthedUsers.length; ++i){
        
        /*
        remember to use decrypt cookie funciton
        for now comment out because it will not be used as encryption lib is disfunctional
        if(frvcipher.decrypt(encyptedUsername, AuthedUsers[i].split(" ")[1]) == AuthedUsers[i].split(" ")[0]){

            callback(true);
            return;
        }
        */

        if(encyptedUsername != null && encyptedUsername == AuthedUsers[i].split(" ")[0]){
            
            callback(true);
            return;

        }
    }
    
    callback(false);
    return;

}

function getCookie(CookieName, request, callback){

//Get all cookies
var allCookies = request.cookies;

if(allCookies == undefined){ // if no cookies exist

    console.log('cookie undefined');

    callback(false);
    return;

}else{

    cookie = request.cookies[CookieName];
    
    //console.log(cookie);

    callback(cookie);
    return;

}

}

//funtion to decrypt authentication cooke with key
function decryptCookie(key, cookie, request, callback){

    //decryp magic here
    var decrypted = cookie;

    callback(decrypted);
    return;
}


module.exports = {

AddAuthedUser,
RemoveAuthedUser,
GetAuthedUserKey,
encryptedUsernameCheck,
getCookie,
decryptCookie

}