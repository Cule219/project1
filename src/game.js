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
    remove(row, count, who){
        game.matches[Number(row-1)].splice(0, count);
        this.isItDone(who);
    }
    isItDone(who){
        let count = 0;
        for(let i = 0; i < this.matches.length; i++) {
            for(let j=0; j<this.matches[i].length; j++){
                count +=this.matches[i][j];
            }
        }
        if(count <= 1){
            btnState = [false,false,false,false];
            player2.setAttribute('disabled', 'true');
            if(who == 'C'){
                Swal.fire({
                    title: 'Good game, one more try?',
                    width: 600,
                    padding: '3em',
                    background: 'rgba(200,200,200,0.6)',
                    backdrop: `
                        rgba(0,0,123,0.4)
                        url("https://66.media.tumblr.com/tumblr_lrbu1l9BJk1qgzxcao1_250.gif")
                        center left
                        no-repeat`
                })
            }
            else if(!mode){
                swal({
                    title:  `You won ${player1.innerHTML}!`,
                    text:   "A reematch perhaps?",
                    icon:   "success",
                    button: "Aww yiss!",
                });
            }
            else{
                swal({
                    title:  `Player${player} won!`,
                    text:   "Woopie",
                    icon:   "success",
                    button: "Congratz",
                    background: 'url(./assets/il_794xN.874599933_kz7n.jpg)'
                });
            }
        }
        
        
    }
}