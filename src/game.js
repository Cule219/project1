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
            player2.setAttribute('disabled', 'true');
            if(who == 'C'){
                Swal.fire({
                    html: '<h1 style="color:#343A40">Computer wins :(</h1><br><h3 style="color:#343A40">Good game tho, one more try?</h3>',
                    color: 'blue',
                    width: 600,
                    padding: '3em',
                    background: 'rgba(200,200,200,0.6) url(./assets/il_794xN.874599933_kz7n.jpg)',
                    backdrop: `
                        rgba(0,0,123,0.4)
                        url("https://66.media.tumblr.com/tumblr_lrbu1l9BJk1qgzxcao1_250.gif")
                        center left
                        no-repeat`
                })
            }
            else if(!mode){
                swal({
                    title:  `Sweet!!!`,
                    text:   `You won ${player1.innerHTML}!`,
                    imageUrl: 'https://source.unsplash.com/random',
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Random image',
                    animation: false,
                    icon:   "success",
                    button: "Aww yiss!",
                });
            }
            else{
                swal({
                    title:  `Player${player} won!`,
                    text:   "Woopie",
                    icon:   "success",
                    //background: 'rgba(200,200,200,0.6) url(./assets/il_794xN.874599933_kz7n.jpg)',
                    button: "Congratz",
                });
            }
            btnState = [false,false,false,false];
        }
        
        
    }
}
