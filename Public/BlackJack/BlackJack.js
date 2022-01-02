var chipNumber = 0


function homeRedirect(){

    window.location.href = "/Home";

}

function addChip(){

    console.log("addChip");
    chipNumber += 1
    updateChip()

}

function minusChip(){

    console.log("minusChip");
    if (chipNumber > 0){
        chipNumber -= 1
    }
    updateChip()

}

function confirmChip(){

    console.log("confirmChip");
    fetch("/Blackjack/chipPurchase");

}

function updateChip(){

    document.getElementById("chipNumber").innerHTML = chipNumber

}