/* Logic */
class Game {
    //computer logic should  be separate class
    //remove hard code for matches eventualy
    //try to use 2d array
    constructor(){
        this.matches = [[1],[1,1],[1],[1,1,1,1,1]];
        this.matchesLength = [this.matches[0].length,this.matches[1].length,this.matches[2].length,this.matches[3].length];
        this.pairs = [0, 0 ,0]
        this.parity = [];
        this.testParity = []
        
        //have to reset parity after every move
    }
    setup(){
        loadMatches();
    }
    getParity() {
        //this.matches.length
        let row;
        this.parity = [];
        this.pairs = [0, 0 ,0];
        for(let i = 0; i < this.matches.length; i++) {
            let currentRow = this.matches[i].length;
            row = [];
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
    

    findRow(unpairedSize, countOfMatches){
        unpairedSize = this.exists(unpairedSize);//th   is needs to be changed so it returns the row and count
        
        let i = Math.floor(Math.random()*this.matches.length);
        while(this.parity[i][Math.floor(unpairedSize/2)] == 0){
            i = Math.floor(Math.random()*this.matches.length);
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
    remove(row, count){
        console.log(row, count)
        this.matches[Number(row-1)].splice(0, count);
    }
    popElements(){
        this.getParity()
        let finalMove = this.finalMove()
        if(finalMove != false) return finalMove;
        let count;
        let index;
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
            let a = this.testPairity();
            console.log(a);
            [index, count] = a;
            
        }
        //addressing three uneven
        else if((fours + twos + ones) == 3){
            let a = [];
            let i = Math.floor(Math.random()*this.matches.length);
            while(this.parity[i][Math.floor(2)] == 0){
                i = Math.floor(Math.random()*this.matches.length);
            }
            if((fours + twos + ones) == 3) {
                if(fours == 1){
                    a.push(4);
                }
                if(twos == 1){
                    a.push(2);
                }
                if(ones == 1){
                    a.push(1);
                }
            }
            count = a[0] - a[1] + 1;
            index = (i + 1);
        }
        this.remove(index, count);//
        return [index, count];//returns row and count respectably
    }
    testPairity(){
        let reqRowSize = Math.max(...this.matchesLength);
        let reqRow = this.matchesLength.indexOf(reqRowSize);
        let num = 0;
        let pairs = [];
        for(let i = 0; i <= reqRowSize; i++) {
            let fours = 0;
            let twos  = 0;
            let ones  = 0;
            this.matchesLength = [this.matches[0].length,this.matches[1].length,this.matches[2].length,this.matches[3].length];
            this.matchesLength.splice(reqRow, 1, reqRowSize - i);
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
            // console.log(this.matchesLength);
            // console.log(fours + ' '  + twos + ' ' + ones)
            if(fours%2+twos%2+ones%2 === 0) {
                num = [Number(reqRow+1), i]//row index and size
                return num;
            }
        }
        console.log(num)
        return num;
    }
    getFullRows(){
        let countFull = [];
        this.matches.forEach(e => {
            if(e.length != 0) countFull.push(e.length)
        })
        return countFull;
    }
    
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
    //check for final move within game and notify the user


    makeAMove(){
        return this.popElements();//returns row and count respectably     
    }
}




//addressing two uneven
 // let a = [];
            // if(fours == 1){
            //     a.push(4);
            // }
            // if(twos == 1){
            //     a.push(2);
            // }
            // if(ones == 1){
            //     a.push(1);
            // }
            // let i = Math.floor(Math.random()*this.matches.length);
            // while(this.parity[i][Math.floor(a[0]/2)] == 0){
            //     i = Math.floor(Math.random()*this.matches.length);
            // }