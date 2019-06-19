/* Logic */
class Game {
    //remove hard code for matches eventualy
    constructor(){
        this.matches = [[1],[1],[1,1,1,1],[1,1,1]];//1,1,1,1,1,1
        this.matchesLength = [this.matches[0].length,this.matches[1].length,this.matches[2].length,this.matches[3].length];
    }
    setup(){
        loadMatches();
    }
    //remove elements
    remove(row, count){
        console.log(row, count)
        game.matches[Number(row-1)].splice(0, count);
    }
    //ai makes a move
    makeAMove(){

    }

    //check for final move within game and notify the user
    isItDone(){

    }
}
