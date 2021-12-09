//data url -> this is where the js is requesting data from
let url = '/home/data';

//Get Html Elements
const accountName = document.getElementById("accountName");
const balance = document.getElementById("bal");


//Request data from server
fetch(url).then(res => res.json()).then(out => gotdata(out));

function gotdata(data){
    
    accountName.innerHTML = (data[0].username);
    balance.innerHTML = (data[0].balance + "$");

}

function logout(){

    var post = new XMLHttpRequest();
    post.open("POST", '/logout', true);
    post.setRequestHeader('Content-Type', 'application/json');
    //post.send(JSON.stringify({}));
    post.send();

    window.location.href = "/";

}

function loteryRedirect(){

    window.location.href = "/Lotery";

}
