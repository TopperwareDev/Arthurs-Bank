
fetch('/Lotery/data').then(res => res.json()).then(out => gridData(out));

function buildGrid(){

  console.log('is thsi dhfsjdfh ');
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
      box.className = 'box';
      loteryTable.appendChild(box).appendChild(button);
    }
  }

}

function updateGrid(){



  //send request to server for taken grids




}

buildGrid();

setInterval(updateGrid(), 100);









/* geheheheheheh egegrgegrge here is thsep robse fix here
document.getElementById('box' + box).style.width = '10px';
document.getElementById('box' + box).style.height = '10px';
*/
/*
const element = document.getElementById("id01");
element.innerHTML = (Math.round(Math.random() * 101));

const d = new Date();

console.log(d.getTime());

console.log(d.getTime().substring(0,3));


function countdown(hours, min, sec, text, callback){

  for(i = 0; i >= 0; ++i){


  }
}

//loteryNum.textContent = "69";


*/
