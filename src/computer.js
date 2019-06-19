class Computer{
    constructor(){
        this.matchesLength = [game.matches[0].length,game.matches[1].length,game.matches[2].length,game.matches[3].length];
        this.pairs = [0, 0 ,0]
        this.parity = [];
        this.testParity = []
    }
    setup(){
    }
    getMatchesLength(){
        this.matchesLength = [game.matches[0].length,game.matches[1].length,game.matches[2].length,game.matches[3].length];
    }
    getParity() {
        //reseting parity and pairs after every move
        this.parity = [];
        this.pairs = [0, 0 ,0];
        //updating parity and pairs
        for(let i = 0; i < game.matches.length; i++) {
            let currentRow = game.matches[i].length;
            let row = [];
            for(let j = 4; j >= 1; j = j/2){
                if(currentRow/j >= 1){
                    currentRow-=j;
                    row.unshift(1);
                    this.pairs[Math.floor(j/2)]++;
                }else{
                    row.unshift(0);
                }
            }
            this.parity.push(row);
        }
    }   
    //this is used by ones to find rand row and zeroes to find rand
    findRow(unpairedSize, countOfMatches){
        //this needs to be changed so it returns the row and count
        unpairedSize = this.exists(unpairedSize);

        let i = Math.floor(Math.random()*game.matches.length);
        while(this.parity[i][Math.floor(unpairedSize/2)] == 0){
            i = Math.floor(Math.random()*game.matches.length);
        }
        if(countOfMatches != undefined) {
            unpairedSize = countOfMatches;
        }
        return [Number(i+1), unpairedSize];//returning row index and size 
    }

    exists(unpairedSize){
        let exists = false;
        while(exists == false) {
            this.parity.forEach(e => {
                if(e[Math.floor(unpairedSize/2)] != 0)exists=true;
            })
            if(exists == false){
                unpairedSize*=2
            }
        }
        return unpairedSize;
    }
    makeAMove(){
        this.getParity()
        let finalMove = this.finalMove()
        if(finalMove != false) return finalMove;
        let count, index;
        let fours  = this.pairs[2]%2;
        let twos   = this.pairs[1]%2;
        let ones   = this.pairs[0]%2;
        // console.log('fours: ' + fours + ' twos: ' + twos + ' ones: ' + ones)
        //random taking can make it that 10% of the time 2 elements  
        //if row has more than4 elements take 2 or more
        //addressing zeroes - random 
        if((fours+twos+ones)==0) {
            //Math.round(Math.random()*6)
            [index, count] = this.findRow(1, 1)//rand # 
        }
        //get these into f
        //addressing one uneven
        else if(fours == 1 && (twos + ones)==0) {
            count = 4;
            [index, count] = this.findRow(count);
        }
        else if(twos==1  && (fours + ones)==0) {
            count = 2;
            [index, count] = this.findRow(count)
        }
        else if(ones==1  && (fours + twos)==0 ) {
            count = 1;
            [index, count] = this.findRow(count)
        }
        //addressing two uneven
        else if((fours + twos + ones) == 2){
            [index, count] = this.testPairity();
        }
        //addressing three uneven 
        else if((fours + twos + ones) == 3){
            let a = this.testPairity();
            [index, count] = a;
        }
        game.remove(index, count);//
        return [index, count];//returns row and count respectably
    }
    //this just checks when two and three are uneven
    testPairity(){
        this.getMatchesLength();
        let reqRowSize = Math.max(...this.matchesLength);
        let reqRow = this.matchesLength.indexOf(reqRowSize);
        let num = 0;
        let pairs = [];
        for(let i = 0; i <= reqRowSize; i++) {
            this.getMatchesLength();
            let fours = 0;
            let twos  = 0;
            let ones  = 0;
            this.matchesLength.splice(reqRow, 1, Number(reqRowSize - i));
            this.matchesLength.forEach(e => {
                if(e>=4){
                    e-=4;
                    fours++;
                }
                if(e>=2){
                    e-=2;
                    twos++;
                }
                if(e>=1){
                    e-=1;
                    ones++;
                }
            })
            if(fours%2+twos%2+ones%2 === 0) {
                num = [Number(reqRow+1), i]//row index and size
                return num;
            }
        }
        console.log(num)
        return num;
    }


    //have to recheck this
    finalMove(){
        let countFull = this.getFullRows;
        //kill f only when 2 rows are remaining
        if(countFull.length==2 && countFull.indexOf(1) != -1){
            console.log(countFull);
            let finalMove = Math.max(...countFull);
            this.findRow(finalMove)
            return [Number(this.matchesLength.indexOf(finalMove) + 1), finalMove];
        }
        
        else if(countFull.length==1 && countFull.indexOf(1) == -1){
            let finalMove = Math.max(...this.matchesLength);
            this.findRow((finalMove, finalMove-1));
            console.log("congratz you won!");//fix this
        }
        return false;
    }
    getFullRows(){
        let countFull = [];
        this.matches.forEach(e => {
            if(e.length != 0) countFull.push(e.length)
        })
        return countFull;
    }
}


