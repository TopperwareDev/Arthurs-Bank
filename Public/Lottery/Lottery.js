const totalboxes = 100;
const pricePrTicket = 1;
const updateIntervalms = 1000 * 10;
const freeBox = 'green';
const takenBox = 'red';
const selectBox = 'yellow';
const usersBox= 'purple';

// Build lottery boxes

function buildGrid(){

  let boxID = 0;

  const height = 10;
  const width = 10;

  //get table from html
  let lotteryTable = document.getElementById('lotteryTable');

  //generate table
  for(let rows = 0; rows < height; ++ rows){

    let row = document.createElement('tr');
    row.id = 'row' + rows;

    lotteryTable.appendChild(row);

    for(let cols = 0; cols < width; ++ cols){
      
      let box = document.createElement('td');
      box.id = 'box' + ++boxID;
      let button = document.createElement('BUTTON');
      button.className = 'boxButton';
      button.setAttribute("onclick", "boxesSelected('" + box.id + "')");
      button.id = 'button' + boxID;
      box.className = 'box';
      lotteryTable.appendChild(box).appendChild(button);
    }
  }

}

// keep track of selected boxes
let selectedBoxes = new Array();
function boxesSelected(boxID){ //color users boxes in a different color

  //console.log(boxID);

  // remember to check so that user cant remove others reserved squares

    for( i = 0; i < selectedBoxes.length; ++i){
      // check if box is in array 
      //console.log(selectedBoxes[i] + " = " + boxID.split('box').pop());
      if(selectedBoxes[i] == boxID.split('box').pop()){ 
    
        changeBoxColor(boxID, freeBox);
        selectedBoxes.splice(i, 1);
        //console.log(selectedBoxes);
        updatePrice(selectedBoxes.length, 1);
        return;
      }
    } 
    changeBoxColor(boxID, selectBox);
    selectedBoxes.push(boxID.split('box').pop());
    updatePrice(selectedBoxes.length, pricePrTicket);
    //console.log(selectedBoxes);
}

//Get Users selected boxes -> send to server 
function BuylotteryTickets(){

  const arrayToString = selectedBoxes.toString();

    const basket = {data: arrayToString};

    if(!(arrayToString == "")){ //Make sure user is not trying to purchase with 0$ in basket

      fetch('/Lottery/BuyTickets', {
        method: 'POST',
        body: JSON.stringify(basket), // to be able to read json on server side remember to add (const bodyParser = require('body-parser') --- app.use(bodyParser.json());)
        headers: {'Content-Type': 'application/json'}
      });

  }

  selectedBoxes = [];
  updatePrice(0, pricePrTicket);
  setTimeout(UpdateGrid, 200);

  for(i = 1; i < totalboxes - 1; ++i){ //reset whole grid

    changeBoxColor('box' + i, freeBox);
    disableBox("button" + i, false);

  }
}

//color all taken boxes red - and dissable them
function UpdateGrid(){

  fetch('/Lottery/getTableData').then(res => res.json()).then(data => {

    data.takenLotteryNumbers.split(',').forEach(element => {


      console.log(data.takenLotteryNumbers);
      if(!(element == '0' || element == '')){
        console.log(element);
        changeBoxColor("box" + element, takenBox);
        disableBox("button" + element, true);
      }
      
    });

    data.usersBoxes.split(',').forEach(element => {

      if(!(element == '0' || element == '')){
        changeBoxColor("box" + element, usersBox);
        disableBox("button" + element, true);
      }

    });

    //update lottery timer and total pool

    document.getElementById('timeLeft_Pool').innerHTML = 'Time left: ' + 0 + 'h | Pool: ' + (data.takenLotteryNumbers.split(',').length) + ' $';

  });

}

// change color of box
function changeBoxColor(boxID, Color){

  console.log(boxID);
  document.getElementById(boxID).style.backgroundColor = Color;

}

function disableBox(buttonId, bool){

  document.getElementById(buttonId).disabled = bool;

}

// update price on lottery page next to buy button
function updatePrice(totalTickets, pricePrTicket){
  document.getElementById("lotteryTicketPriceTag").innerHTML = (totalTickets * pricePrTicket) + "$";
}

buildGrid();

//update grid when page loads
window.onload = () => {
  UpdateGrid();
};

//update grid every 30 secconds
setInterval(UpdateGrid, updateIntervalms);


