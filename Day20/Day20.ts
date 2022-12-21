import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day20/input.txt");
var input1 = new InputFile("./day20/input1.txt");
var input2 = new InputFile("./day20/input2.txt");
var input3 = new InputFile("./day20/input3.txt");

class Node {

    public mData: number

    public mNext: Node | undefined
    public mPrev: Node | undefined

    constructor(aData: number) {
        this.mData = aData
        this.mNext = this.mPrev = undefined
    }
}

const getNode = function(aNr: number): Node | undefined {
    let crNode = first
    while(crNode?.mData != aNr)
        crNode = crNode?.mNext    

    return crNode
}

const move = function(toMove: Node,  after: Node) {
    
    if(toMove.mNext)
      toMove.mNext.mPrev = toMove.mPrev
    if(toMove.mPrev) {      
      toMove.mPrev.mNext = toMove.mNext
    }

    let link1 = after.mNext
    if(link1)
      link1.mPrev = toMove
    after.mNext = toMove
    toMove.mNext = link1
    toMove.mPrev = after
}

let crNode: Node | undefined = undefined
let first: Node | undefined = undefined

let nodes = new Array<Node>();

input.getAsLines().map(line => Number(line)).forEach((nr, idx, arr) => {

    let node = new Node(nr);
    nodes.push(node);

    if(!first)
       first = node

    if(crNode) {
      crNode.mNext = node
      node.mPrev = crNode
    }

    crNode = node

    if(idx == arr.length - 1){
        crNode.mNext = first
        first.mPrev = crNode
    }
})

for(let i = 0; i < nodes.length; i++) {
    let elem = nodes[i].mData
        
    let toMove = nodes[i]
    if(toMove && toMove.mNext && toMove.mPrev && toMove.mPrev.mPrev) {        
        for(let idx = elem >= 0 ? 0 : 0; idx < Math.abs(elem); idx++)
          move(toMove, elem > 0 ? toMove.mNext : toMove.mPrev.mPrev)
    }
}

let sum = 0
crNode = getNode(0)
for(let idx = 0; idx <= 3000; idx++) {
  if((idx == 1000 || idx == 2000 || idx == 3000)) {
    sum += crNode ? crNode.mData : 0;    
  }

  crNode = crNode?.mNext
}

console.log(sum)