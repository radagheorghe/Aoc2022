import { pipeline } from 'stream';
import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day21/input.txt");
var input1 = new InputFile("./day21/input1.txt");


class Monkey {
    public mNumber: number | undefined
    public mOperation: string | undefined
    public mMonkey1: Monkey | undefined
    public mMonkey2: Monkey | undefined
   
    constructor() {
        this.mNumber = undefined
        this.mOperation = undefined
        this.mMonkey1 = undefined
        this.mMonkey2 = undefined
    }

    setNumber(aNr: number | undefined) {
        this.mNumber = aNr
    }

    setOperation(aOp: string) {
        this.mOperation = aOp
    }
    
    setMonkeys(aM1: Monkey | undefined, aM2: Monkey | undefined) {
        this.mMonkey1 = aM1
        this.mMonkey2 = aM2
    }

    getNumber(): number {
        if(this.mNumber)
          return this.mNumber

        if(this.mMonkey1 && this.mMonkey2 && this.mOperation)           
            switch (this.mOperation) {
            case '+':
                this.mNumber = this.mMonkey1?.getNumber() + this.mMonkey2?.getNumber()
                break
            case '-':
                this.mNumber = this.mMonkey1?.getNumber() - this.mMonkey2?.getNumber()
                break
            case '*':
                this.mNumber = this.mMonkey1?.getNumber() * this.mMonkey2?.getNumber()
                break
            case '/':
                this.mNumber = this.mMonkey1?.getNumber() / this.mMonkey2?.getNumber()
                break
            case '=':
                let res1 = this.mMonkey1?.getNumber()
                let res2 = this.mMonkey2?.getNumber()
                
                if(res1 == res2)
                  this.mNumber = 1                
                else if(res1 > res2) {
                  this.mNumber = -2
                  console.log(res1, '>', res2)
                }
                else if(res1 < res2) {
                  this.mNumber = -1
                  console.log(res1, '<', res2)
                }
            }

        return this.mNumber ? this.mNumber : 0
    }
}

let monkeys = new Map<string, Monkey>();
input.getAsLines().forEach(line => {

    let tokens = line.split(':')
    let tokens1 = tokens[1].trim().split(' ');

    let name = tokens[0]
    let m = monkeys.has(name) ? monkeys.get(name) : new Monkey()

    if(tokens1.length == 3) {
        let name1 = tokens1[0]
        let name2 = tokens1[2]

        let m1 = monkeys.has(name1) ? monkeys.get(name1) : new Monkey()
        let m2 = monkeys.has(name2) ? monkeys.get(name2) : new Monkey()
                
        if(m1)
          monkeys.set(name1, m1)
        if(m2)
          monkeys.set(name2, m2)
        if(m) {
          m.setOperation(tokens1[1])
          m.setMonkeys(m1, m2)
          monkeys.set(name, m)
        }
    }
    else {                       
      if(m) {
        m.setNumber(Number(tokens[1]))
        monkeys.set(name, m)
      }
    }
})

let root = monkeys.get('root')
console.log(monkeys.get('root')?.getNumber())

root?.setOperation('=')

monkeys.forEach(m => {
    if(m.mOperation) m.setNumber(undefined)
})

let humn = monkeys.get('humn')

let low = 0
let high = 81075092088440
let mid = 0
let last = 1
while(root) {
        
    mid = Math.floor(low + (high - low)/2)
    console.log('mid: ', mid)
    
    if(mid == last) {
      console.log('not found')     
      break
    }

    last = mid
    humn?.setNumber(mid)
    
    monkeys.forEach(m => {
        if(m.mOperation) m.setNumber(undefined)
    })

    if(root.getNumber() == -2)
      low = mid + 1
    else if(root.getNumber() == -1)
      high = mid - 1
    else if(root.getNumber() == 1)
      break;
}

console.log(mid)