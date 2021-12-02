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

async function encryptedUsernameCheck(encyptedUsername, bcrypt, callback){

    for(i = 0; i != AuthedUsers.length; ++i){

        const authenticated = await bcrypt.compare(AuthedUsers[i], encyptedUsername);
        
        if(encyptedUsername != null && authenticated){
            
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


module.exports = {

AddAuthedUser,
RemoveAuthedUser,
encryptedUsernameCheck,
getCookie

}