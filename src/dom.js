let name1       = "Player1";
let name2       = "Computer";
let mode        = false;
let player      = 1;
let row1        = document.querySelector('.row1');
let row2        = document.querySelector('.row2');
let row3        = document.querySelector('.row3');
let row4        = document.querySelector('.row4');
let main        = document.querySelector('#main');
let player1     = document.querySelector('#player1');
let player2     = document.querySelector('#player2');
let reset       = document.querySelector('#reset');
let instr       = document.querySelector('#instructions');
let modeBtn     = document.querySelector('#mode');
let btnState = [true, true, true, true];
let rows = [row1, row2, row3, row4]
let li;
function selectMode(){
    if(mode == false) {
        singleplay();
    }
    if(mode == true) {
        multiplay();
    }
}
modeBtn.addEventListener('click', e => {
    mode = !mode;
    newGame();
    selectMode();
})
function multiplay(){
    player2.setAttribute('disabled', true);
    player1.innerHTML = "Player1";
    player1.classList = "your-turn";
    player2.innerHTML = "Player2";
    //input of names should go in here
}
selectMode()
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
function removeSingleElement(elementsRow, row){
    lili = document.querySelector(`.row${row} > .lili`);
    elementsRow.removeChild(lili);
}
function removeMatches(row, count, c){
    let lili;
    let elementsRow = document.querySelector('.row' + row);
    let timer = count*200;
    while(count > 0){
        if(c){
            setTimeout(e=>{
                removeSingleElement(elementsRow, row);
                if(count <= 1) {
                    setYourTurn();
                }
            }, Number(timer/count));
            timer/=count;
        }
        else{
            removeSingleElement(elementsRow, row);
        }
        count--;
    }
}
function setYourTurn(){
    setTimeout(()=>{
        player1.classList = "your-turn";
    },200);
}
function played(btn){
    btnState        = [false,false,false,false];
    btnState[btn]   = true;
    game.remove(Number(btn+1), 1, player);
    removeMatches(Number(btn+1), 1);
    if(!mode) {
        player2.removeAttribute('disabled');
        player1.classList = 'btn-side'
    }
    else if(mode && player == 1) {
        player2.removeAttribute('disabled');
        player1.classList = 'btn-side'
    }
    else if(mode && player == 2){
        player1.removeAttribute('disabled');
    }

}
function resetStates(){
    btnState = [true, true, true, true];
}

player1.addEventListener('click', (e)=>{
    if(mode){
        player = 1;
        player1.setAttribute('disabled', 'true');
        resetStates();
    }
});
player2.addEventListener('click', (e)=>{
    if(mode){
        player = 2;
        player2.setAttribute('disabled', 'true');
        resetStates();
    }
    else{
        resetStates();
        let [a, b] = computer.makeAMove();
        removeMatches(a, b, true);
        player2.setAttribute('disabled', 'true');
    }
});

row1.addEventListener('click', (e)=>{
    if(btnState[0] == true) {
        played(0);
        }
})
row2.addEventListener('click', (e)=>{
    if(btnState[1] == true) {
        played(1);
    }
})
row3.addEventListener('click', (e)=>{
    if(btnState[2] == true) {
        played(2);
    }
})
row4.addEventListener('click', (e)=>{
    if(btnState[3] == true) {
        played(3);
    }
})

reset.addEventListener('click', (e)=>{
    newGame();
});
function newGame(){
    selectMode();
    resetStates();
    game = new Game();
    game.setup();
}
instr.addEventListener('click', (e)=>{
    swal('How to play',
    `Nim is a mathematical game of strategy in which two players take turns removing (i.e., nimming) objects from distinct heaps or piles. On each turn, a player must remove at least one object, and may remove any number of objects provided they all come from the same heap/pile. The goal of the game is to avoid taking the last object.`);
})
function singleplay(){
    player1.setAttribute('disabled', 'true');
    setYourTurn();
    player2.setAttribute('disabled', 'false');
    player2.innerHTML = "Computer";
    Swal.fire({
        title: 'Welcome to Nim!',
        html:
          `The traditional Nim-game (aka Marienbad-game) consists of four rows of 1, 3, 5 and 7
           matchsticks (or any other objects). Two players take any number of matchsticks from 
           one row alternately. The one, who takes the last matchstick loses. <br/><br/>
          ` +
          '<button id="multi-select" class="btn btn-warning">' +
            'Multiplayer' +
          '</button>'+
          '<button id="single-select" class="btn btn-danger">' +
            'Singleplayer' +
          '</button><br/>',
        onBeforeOpen: () => {
            const content = Swal.getContent()
            const $ = content.querySelector.bind(content)
            const multiSelect = $('#multi-select')
            const singleSelect = $('#single-select')
            multiSelect.addEventListener('click', (e) => {
                mode = true;
            })
            singleSelect.addEventListener('click', (e) => {
                mode = false;
            })
        }
      }).then( () =>{
        if(mode==true)newGame();
        else{
            swal(
                "Nim!",`Your name please:`
            , {
                content: "input",
              })
              .then((value) => {
                if(value.length > 0)player1.innerHTML = value;
              })
        }
    });
}
