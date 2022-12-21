import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day11/input.txt");
var input1 = new InputFile("./day11/input1.txt");

enum Operation {
    Multiply = 0,
    Addition,
}

class Monkey {

    public mItems: Array<number>;
    public mOperation: Operation;
    public mOperand1: String;
    public mOperand2: String;
    public mTestOperand: number;
    public mTestTrue: number;
    public mTestFalse: number;
    public mInspected: number;

    constructor(aGroup: String) {
        this.mItems = new Array<number>();
        
        let lines = aGroup.split('-');
        this.mItems = lines[1].split(':')[1].split(',').map(nr => Number(nr));

        let op = lines[2].split('=')[1].trim().split(' ');

        this.mOperation = op[1] === '*' ? Operation.Multiply : Operation.Addition;
        this.mOperand1 = op[0];
        this.mOperand2 = op[2];

        const re = /\d+/g;
	    const testMatch = lines[3].match(re);
        const testMatch1 = lines[4].match(re);
        const testMatch2 = lines[5].match(re);

        this.mTestOperand = testMatch ? testMatch.map(n => Number(n))[0] : 0;
        this.mTestTrue = testMatch1 ? testMatch1.map(n => Number(n))[0] : 0;
        this.mTestFalse = testMatch2 ? testMatch2.map(n => Number(n))[0] : 0;

        this.mInspected = 0;
    }
}

let monkeys = new Array<Monkey>();

input1.getAsGroups('-').forEach(group => {
    
    monkeys.push(new Monkey(group));
})

for(let round = 0; round < 10000; round++) {

    monkeys.forEach(monkey => {
        
        while(1) {
            let item = monkey.mItems.shift();
            if(!item)
              break;
            let worryLevel = 0;            
            switch(monkey.mOperation) {
                case Operation.Multiply:
                    worryLevel = (monkey.mOperand1 === 'old' ? item : Number(monkey.mOperand1)) * 
                                 (monkey.mOperand2 === 'old' ? item : Number(monkey.mOperand2))
                    break;
                case Operation.Addition:
                    worryLevel = (monkey.mOperand1 === 'old' ? item : Number(monkey.mOperand1)) + 
                                 (monkey.mOperand2 === 'old' ? item : Number(monkey.mOperand2))
                    break;
            }
            //worryLevel = Math.floor(worryLevel / 3);
            if(worryLevel % monkey.mTestOperand == 0)
              monkeys[monkey.mTestTrue].mItems.push(worryLevel);
            else
              monkeys[monkey.mTestFalse].mItems.push(worryLevel);
            monkey.mInspected ++;
        }
    })
}

let max = monkeys.map(m => m.mInspected).sort((a,b) => a - b).reverse();
console.log(max[0]*max[1])