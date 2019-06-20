/* Logic */
class Game {
    //remove hard code for matches eventualy
    constructor(){
        this.matches = [[1],[1,1,1],[1,1,1,1,1],[1,1,1,1,1,1,1]];
        this.matchesLength = [this.matches[0].length,this.matches[1].length,this.matches[2].length,this.matches[3].length];
    }
    setup(){
        loadMatches();
    }
    //remove elements
    remove(row, count){
        game.matches[Number(row-1)].splice(0, count);
        this.isItDone();
    }

    //check for final move within game and notify the user
    isItDone(){
        let count = 0;
        for(let i = 0; i < this.matches.length; i++) {
            for(let j=0; j<this.matches[i].length; j++){
                count +=this.matches[i][j];
            }
        }
        if(count <= 1){
            swal("Game done!", "...good job!");
        }
    }
}