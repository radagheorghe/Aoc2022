import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day17/input.txt");
var input1 = new InputFile("./day17/input1.txt");

let spahes = 
[
   ['####'],

   ['.#.',
    '###',
    '.#.'],

   ['..#',
    '..#',
    '###'],

   ['#',
    '#',
    '#',
    '#'],

   ['##',
    '##'],
]

type Point = {x: number, y: number}
type Shape = Array<Point>

const getShape = function(aArray: Array<String>): Shape {
  let shape = new Array<Point>();

  let tall = aArray.length
  for(let y = 0; y < aArray.length; y++, tall--) {
    let line = aArray[y].split('')
    for(let x = 0; x < line.length; x++)
      if(aArray[y][x] == '#')
      shape.push({x: x + 2, y: maxY + tall});
  }

  return shape
}

const moveDown = function(aShape: Shape): boolean {
  let tmp = JSON.parse(JSON.stringify(aShape));
  for(let i = 0; i < tmp.length; i++)
    tmp[i].y --;

  if(checkShape(tmp))
    return false// cannot move

  for(let i = 0; i < aShape.length; i++)
    aShape[i].y --;
  
  return true
}

const moveLeft = function(aShape: Shape) {
  if(aShape.find(pt => pt.x == 0))
    return // cannot move

  let tmp = JSON.parse(JSON.stringify(aShape));
  for(let i = 0; i < tmp.length; i++)
    tmp[i].x --;

  if(checkShape(tmp))
    return // cannot move

  for(let i = 0; i < aShape.length; i++)
    aShape[i].x --;
}

const moveRight = function(aShape: Shape) {
  if(aShape.find(pt => pt.x == 6))
    return // cannot move

  let tmp = JSON.parse(JSON.stringify(aShape));
  for(let i = 0; i < tmp.length; i++)
    tmp[i].x ++;

  if(checkShape(tmp))
    return // cannot move

  for(let i = 0; i < aShape.length; i++)
    aShape[i].x ++;
}

const checkShape = function(aShape: Shape): boolean {
  for(let i = aShape.length - 1; i >= 0; i--)
    if(restPoints.find(pt => pt.x == aShape[i].x && pt.y == aShape[i].y))
      return true
  return false
}

let crShape = 0;
let crGassDir = 0;
let nrOfShapes = 0;
let restPoints = new Array<Point>();
let maxY = 0;

maxY = 2974
nrOfShapes = 1877
for(; nrOfShapes < 1000000000000 - 10000; nrOfShapes += 1735,maxY+=2781);
crGassDir = 853
crShape = 2

// consider this as the flour
for(let x = 0; x <= 6; x++)
  restPoints.push({x: x, y: maxY-1})
restPoints.push({x: 1, y: maxY})

let gass = input.getContent().split('');

let last = new Set();
while(true) {
  
  maxY += 3;
  let shape = getShape(spahes[crShape]);
  nrOfShapes++;

  if(nrOfShapes == 1000000000001)
    break;

  do {
    switch(gass[crGassDir]) {
      case '<':
        moveLeft(shape)
        break
      case '>':
        moveRight(shape)
        break
    }
    crGassDir ++;
    if(crGassDir >= gass.length)
      crGassDir = 0;
  } while(moveDown(shape))

  // shape come to rest 
  shape.forEach(pt => restPoints.push(pt));

  let allY = restPoints.map(pt => pt.y)
  let minY = Math.min(...allY)
  maxY = Math.max(...allY)

  crShape ++;

  if(crShape >= 5)
    crShape = 0;

  for(let y = maxY; y >= minY; y--) 
    if(restPoints.filter(pt => pt.y == y).length == 7 && !last.has(y)) {
      restPoints = restPoints.filter(pt => pt.y >= y)
      
      console.log(y, '-', crGassDir, '-', crShape, '-', nrOfShapes)

      let p = 0;
      if(restPoints.length == 8)
        p++

      last.add(y)
      break
    }
}


console.log(maxY - 3)