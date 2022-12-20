import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day9/input.txt");
var input1 = new InputFile("./day9/input1.txt");

class Point {
    public mX: number;
    public mY: number;

    constructor(aX: number, aY: number) {
        this.mX = aX;
        this.mY = aY;
    }
}

let head = new Point(0, 0);
let knots = new Array<Point>();

let knotMoves = new Array<Array<Point>>();

for(let i = 0; i < 9; i++) 
  knots.push(new Point(0, 0));

for(let i = 0; i < 10; i++) 
  knotMoves.push(new Array<Point>());

let tailMoves = new Array<Point>();
tailMoves.push(knots[8]);



function isNearHead(aTail: Point, aHead: Point) {
    const neighbors = [

        [0, 0],
        [-1, -1], 
        [-1, 0], 
        [-1, 1], 
        [0, -1], 
        [0, 1], 
        [1, -1], 
        [1, 0], 
        [1, 1]
        
        ]
    for(let i = 0; i < neighbors.length; i++) {
        if(aTail.mX + neighbors[i][0] == aHead.mX && aTail.mY + neighbors[i][1] == aHead.mY)
          return true;
    }

    return false;
}

function move(aX: number, aY: number) {

    head.mX += aX;
    head.mY += aY;

    let crKnot: Point | undefined = head;
    for(let i = 0; i < 9; i++) {
      
      if(crKnot && !isNearHead(knots[i], crKnot)) {
        let knot = knotMoves[i].pop();
        if(knot)
          knots[i] = knot; 
      }
      
      knotMoves[i].push(new Point(crKnot.mX, crKnot.mY));
      crKnot = knots[i];
    }

   
    if(!tailMoves.find(t => {return t.mX == knots[8]?.mX && t.mY == knots[8].mY}))
      tailMoves.push(knots[8]);
}

input1.getAsLines().forEach(line => {

    let moves = line.split(' ');
    let steps = Number(moves[1]);
    
    for(let step = 0; step < steps; step++) {
        switch(moves[0]) {
            case 'R':
                move(1, 0);
                break;
            case 'L':
                move(-1, 0);
                break;
            case 'U':
                move(0, 1);
                break;
            case 'D':
                move(0, -1);
                break;
        }
    } 
})

console.log(tailMoves.length)