//get all participating users from server and show them on table
function getParticipatingLotteryUsers(){

    //request data from server on xxx dir
    fetch('/Admin/lotery_Data').then(res => res.json()).then(data => {

        document.getElementById('participaiting_Users_Ratio').innerHTML = data.TOTAL_PARTICIPATING_USERS + '/' + data.TOTAL_USERS;
        
        document.getElementById('taken_Lotery_Numbers').innerHTML = "Taken Lottery Numbers: " + data.TOTAL_NUMERS.replace(/,/g, ', ');

        console.log(data);

        showParticipatingUsersLotery(data.PARTICIPATING_USERNAMES);

    });

}

//create table and show participaing users 
function showParticipatingUsersLotery(users){
    
    console.log(users.split(',').length);

    let parTable = document.getElementById('par-table');

    for(i = 0; i < users.split(',').length; ++i){

        let row = document.createElement('tr');
        let usernametxt = document.createElement('p');
        usernametxt.innerHTML = users.split(',')[i];
        parTable.appendChild(row).appendChild(usernametxt);

    }

}

//send request to server to reset lottery and award winner
function resetLotery(){

    fetch('/Admin/lotery_reset');

}



//update grid when page loads
window.onload = () => {
    getParticipatingLotteryUsers();
};

//possible call getParticipatingLotteryUsers() each 10 sec for autoupdating functionaliy