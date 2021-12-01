function logout(){

    var post = new XMLHttpRequest();
    post.open("POST", '/logout', true);
    post.setRequestHeader('Content-Type', 'application/json');
    //post.send(JSON.stringify({}));
    post.send();

}