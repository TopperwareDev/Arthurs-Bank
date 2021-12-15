fetch('/Lottery/getTableData').then(res => res.json()).then(out => gridData(out));

const freeBox = "green";
const takenBox = "red";
const selectBox = "yellow";

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
    updatePrice(selectedBoxes.length, 1);
    //console.log(selectedBoxes);

    function updatePrice(totalTickets, pricePrTicket){
      document.getElementById("lotteryTicketPriceTag").innerHTML = (totalTickets * pricePrTicket) + "$";
    }

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

}

// change color of box
function changeBoxColor(boxID, Color){

  document.getElementById(boxID).style.backgroundColor = Color;

}

buildGrid();

