
let row1 = document.querySelector('.row1');
let row2 = document.querySelector('.row2');
let row3 = document.querySelector('.row3');
let row4 = document.querySelector('.row4');
let main = document.querySelector('#main');

let li;
let rows = [row1, row2, row3, row4]


function loadMatches(){
    row1.innerHTML = "";
    row2.innerHTML = "";
    row3.innerHTML = "";
    row4.innerHTML = "";
    game.matchesLength.forEach((element, index) => {
        while(element > 0 ){
            li = document.createElement('li');
            li.className = 'lili';
            li.innerHTML = '<img src="./assets/matcho1.gif" alt="img">'
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
    //lock the row that the match is at
}


let row1Btn = document.querySelector('#btn-side1');
let row2Btn = document.querySelector('#btn-side2');
let row3Btn = document.querySelector('#btn-side3');
let row4Btn = document.querySelector('#btn-side4');
let newGame = document.querySelector('#new-game');
let oponent = document.querySelector('#oponent-move');
row1Btn.addEventListener('click', (e)=>{
    game.remove(1, 1);
    removeMatches(1, 1);
})
row2Btn.addEventListener('click', (e)=>{
    game.remove(2, 1);
    removeMatches(2, 1);
})
row3Btn.addEventListener('click', (e)=>{
    game.remove(3, 1);
    removeMatches(3, 1);
})
row4Btn.addEventListener('click', (e)=>{
    game.remove(4, 1);
    removeMatches(4, 1);
})
oponent.addEventListener('click', (e)=>{
    let [a, b] = computer.makeAMove();
    console.log(a + ' : ' + b)
    removeMatches(a, b);
})
newGame.addEventListener('click', (e)=>{
    game = new Game();

})