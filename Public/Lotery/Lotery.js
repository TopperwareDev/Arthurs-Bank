
fetch('/Lotery/getTableData').then(res => res.json()).then(out => gridData(out));

const freeBox = "green";
const takenBox = "red";
const selectBox = "yellow";

// Build lotery boxes

function buildGrid(){

  let boxID = 0;

  const height = 10;
  const width = 10;

  //get table from html
  let loteryTable = document.getElementById('loteryTable');

  //generate table
  for(let rows = 0; rows < height; ++ rows){

    let row = document.createElement('tr');
    row.id = 'row' + rows;

    loteryTable.appendChild(row);

    for(let cols = 0; cols < width; ++ cols){
      
      let box = document.createElement('td');
      box.id = 'box' + ++boxID;
      let button = document.createElement('BUTTON');
      button.className = 'boxButton';
      button.setAttribute("onclick", "boxesSelected('" + box.id + "')");
      box.className = 'box';
      loteryTable.appendChild(box).appendChild(button);
    }
  }

}

// keep track of selected boxes
let selectedBoxes = new Array();
function boxesSelected(boxID){

  console.log(boxID);

  // remember to check so that user cant remove others reserved squares

    for( i = 0; i < selectedBoxes.length; ++i){
      // check if box is in array 
      console.log(selectedBoxes[i] + " = " + boxID.split('box').pop());
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
      document.getElementById("loteryTicketPriceTag").innerHTML = (totalTickets * pricePrTicket) + "$";
    }

}

//Get Users selected boxes -> send to server for verification and purchase
function BuyloteryTickets(){

  arrayToString(array, callback)

}

// change color of box
function changeBoxColor(boxID, Color){

  document.getElementById(boxID).style.backgroundColor = Color;

}

//change array into string so it can be sent to server
function arrayToString(array, callback){

  array.forEach(element => {
    
  });


}




buildGrid();

//function updateGrid(){}

//setInterval(updateGrid(), 100);

