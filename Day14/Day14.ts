import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day14/input.txt");
var input1 = new InputFile("./day14/input1.txt");

class Point {
    public mX: number
    public mY: number

    constructor(aX: number, aY: number) {
        this.mX = aX
        this.mY = aY
    }
}

let limitY = 0;
let grid = new Array<Point>();
let onlySand = new Array<Point>();

function restPoint(aPoint: Point) {
  let found = grid.find(pt => pt.mX == aPoint.mX && pt.mY == aPoint.mY)
  if(!found)
    grid.push(aPoint)
}

input.getAsLines().forEach(strLine => {
    let points = strLine.split('->')

    for(let i = 0; i < points.length - 1; i++) {
      let start = points[i].split(',').map(nr => Number(nr));
      let end = points[i + 1].split(',').map(nr => Number(nr));

      let minX = Math.min(...[start[0], end[0]])
      let maxX = Math.max(...[start[0], end[0]])
      let minY = Math.min(...[start[1], end[1]])
      let maxY = Math.max(...[start[1], end[1]])
      
      if(limitY < maxY)
        limitY = maxY

      for(let x = minX; x <= maxX; x++)
        for(let y = minY; y <= maxY; y++)
          restPoint(new Point(x, y));
    }
})

for(let i = 300; i < 700; i++)
  grid.push(new Point(i, limitY + 2))

const flowLeft = function(aPoint: Point): Point | undefined {
  let newLeft = new Point(aPoint.mX - 1, aPoint.mY + 1)
  let found = grid.find(pt => pt.mX == newLeft.mX && pt.mY == newLeft.mY)
  
  return !found ? newLeft : undefined
}

const flowRight = function(aPoint: Point): Point | undefined {
  let newRight = new Point(aPoint.mX + 1, aPoint.mY + 1)
  let found = grid.find(pt => pt.mX == newRight.mX && pt.mY == newRight.mY)
  
  return !found ? newRight : undefined
}

const flowDown = function(aPoint: Point): Point | undefined {
  let newDown = new Point(aPoint.mX, aPoint.mY + 1)
  let found = grid.find(pt => pt.mX == newDown.mX && pt.mY == newDown.mY)
  
  return !found ? newDown : undefined
}

function simulate(aStart: Point): Point {

  let last = aStart
  let sand: Point | undefined = aStart
  while(sand) {
    last = sand
    sand = flowDown(last)
    if(!sand)
      sand = flowLeft(last)
    if(!sand)
      sand = flowRight(last)
  }
  return last
}

let start = new Point(500, 0);
while(1) {
  let rest = simulate(start)

  grid.push(rest)
  onlySand.push(rest)

  if(rest.mY == 0)
    break;
}

console.log(onlySand.length)