
let name1       = "Player1";
let name2       = "Computer";

let mode        = 'S';

let row1        = document.querySelector('.row1');
let row2        = document.querySelector('.row2');
let row3        = document.querySelector('.row3');
let row4        = document.querySelector('.row4');
let main        = document.querySelector('#main');
let player1     = document.querySelector('#player1');
let player2     = document.querySelector('#player2');
let reset       = document.querySelector('#reset');
let row1BtnState = true;
let row2BtnState = true;
let row3BtnState = true;
let row4BtnState = true;

let li;
let rows = [row1, row2, row3, row4]

function selectMode(){
    swal(
        "Nim",`
    The traditional Nim-game (aka Marienbad-game) consists of four rows of 1, 3, 5 and 7 matchsticks (or any other objects). Two players take any number of matchsticks from one row alternately. The one, who takes the last matchstick loses. 
    
    
    
    input:`
    , {
        content: "input",
      })
      .then((value) => {
        if(value != '')player1.innerHTML = value;
      })
}
selectMode();


function loadMatches(){
    row1.innerHTML = "";
    row2.innerHTML = "";
    row3.innerHTML = "";
    row4.innerHTML = "";
    game.matchesLength.forEach((element, index) => {
        while(element > 0 ){
            li = document.createElement('li');
            li.className = 'lili';
            li.innerHTML = '<div class="item blue-grey" id="h2-1"></div>'
            rows[index].appendChild(li);
            element--;
        }
    });
}

function removeMatches(row, count){
    let lili;
    let elementsRow = document.querySelector('.row' + row);
    while(count > 0){
        lili = document.querySelector(`.row${row} > .lili`);
        elementsRow.removeChild(lili);
        count--;
    }
}

row1.addEventListener('click', (e)=>{
    if(row1BtnState == true) {
        row2BtnState = false;
        row3BtnState = false;
        row4BtnState = false;
        game.remove(1, 1);
        removeMatches(1, 1);
        player2.removeAttribute('disabled');
    }
})
row2.addEventListener('click', (e)=>{
    if(row2BtnState == true) {
        row1BtnState = false;
        row3BtnState = false;
        row4BtnState = false;
        game.remove(2, 1);
        removeMatches(2, 1);
        player2.removeAttribute('disabled');
    }
})
row3.addEventListener('click', (e)=>{
    if(row3BtnState == true) {
        row1BtnState = false;
        row2BtnState = false;
        row4BtnState = false;
        game.remove(3, 1);
        removeMatches(3, 1);
        player2.removeAttribute('disabled');
    }
})
row4.addEventListener('click', (e)=>{
    if(row4BtnState == true) {
        row1BtnState = false;
        row2BtnState = false;
        row3BtnState = false;
        game.remove(4, 1);
        removeMatches(4, 1);
        player2.removeAttribute('disabled');
    }
})
function resetStates(){
    row1BtnState = true;
    row2BtnState = true;
    row3BtnState = true;
    row4BtnState = true;
    player2.setAttribute('disabled', 'true');
}

player1.addEventListener('click', (e)=>{
});
player2.addEventListener('click', (e)=>{
    resetStates();
    let [a, b] = computer.makeAMove();
    removeMatches(a, b);
    player2.setAttribute('disabled', 'true');
});
reset.addEventListener('click', (e)=>{
    newGame();
});
function newGame(){
    resetStates();
    player2.removeAttribute('disabled');
    game = new Game();
    game.setup();
}

function Multiplay(){

}


/*btnLeft.addEventListener('click', function () {
    if(state) {
        btnLeft.innerHTML = 'STOP';
        btnLeft.classList = 'btn stop' 
        
        btnRight.innerHTML = 'SPLIT'
        btnRight.classList = 'btn split'
        chronometer.startClick();
    }
    else {
        btnLeft.innerHTML = 'START';
        btnLeft.classList = 'btn start'

        btnRight.innerHTML = 'RESET'
        btnRight.classList = 'btn reset'
        chronometer.stopClick();
    }
    state = !state;
});*/