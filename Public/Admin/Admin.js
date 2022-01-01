//get all participating users from server and show them on table
function getParticipatingLotteryUsers(){

    //request data from server on xxx dir
    fetch('/Admin/lotery_Data').then(res => res.json()).then(data => {

        document.getElementById('participaiting_Users_Ratio').innerHTML = data.TOTAL_PARTICIPATING_USERS + '/' + data.TOTAL_USERS;
        
        document.getElementById('taken_Lotery_Numbers').innerHTML = "Taken Lottery Numbers: " + data.TOTAL_NUMERS.replace(/,/g, ', ');

    });

}

//send request to server to reset lottery and award winner
function resetLotery(){

    

}

//update grid when page loads
window.onload = () => {
    getParticipatingLotteryUsers();
};

//possible call getParticipatingLotteryUsers() each 10 sec for autoupdating functionaliy