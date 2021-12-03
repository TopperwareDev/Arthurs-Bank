//data url -> this is where the js is requesting data from
let url = '/home/data';

const username = null;
const balance  = null;

function logout(){

    var post = new XMLHttpRequest();
    post.open("POST", '/logout', true);
    post.setRequestHeader('Content-Type', 'application/json');
    //post.send(JSON.stringify({}));
    post.send();

    window.location.href = "/";

}

//request username from server
fetch(url).then(res => res.json()).then(out => console.log('this is username: ' + out[0].username));