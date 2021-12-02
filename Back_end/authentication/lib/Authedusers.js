var AuthedUsers = new Array();

function AddAuthedUser(username){

    RemoveAuthedUser(username);

    AuthedUsers.push(username);

    //console.log(AuthedUsers);

}

function RemoveAuthedUser(username){

for(i = 0; i < AuthedUsers.length; ++i){

    if(AuthedUsers[i] == username){
        
        AuthedUsers.splice(i,1);

    }
}

}

function GetAuthedUserKey(encryptedUsername, callback){

    for(i = 0; i != AuthedUsers.length; ++i){
        if(AuthedUsers[i] == encryptedUsername){

            callback(AuthedUsers[i]);// read seccond element in arry
            return; 
            
        }
    }
}

function encryptedUsernameCheck(encyptedUsername, callback){

    for(i = 0; i != AuthedUsers.length; ++i){
        
        if(encyptedUsername != null && encyptedUsername == AuthedUsers[i]){
            
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