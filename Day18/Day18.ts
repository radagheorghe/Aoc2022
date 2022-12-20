import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day18/input.txt");
var input1 = new InputFile("./day18/input1.txt");

let points = input.getAsLines()
                  .map(line => line.split(',').map(nr => Number(nr)))

let row = [ 1, 0, -1,  0, 0,  0 ]
let col = [ 0, 1,  0, -1, 0,  0 ]
let dep = [ 0, 0,  0,  0, 1, -1 ]

const isEmpty = function(aPoint: Array<number>): boolean {
  let count = 0
  for(let n = 0; n < 6; n++) {
    let neighbour = [ aPoint[0] + row[n], 
                      aPoint[1] + col[n], 
                      aPoint[2] + dep[n] ]

    count += points.find(pt => pt[0] == neighbour[0] && 
                               pt[1] == neighbour[1] && 
                               pt[2] == neighbour[2]) ? 1 : 0;
  }

  return count == 6
}

const inBounds = function(aPoint: Array<number>): boolean {

  return (aPoint[0] >= minX && aPoint[0] <= maxX && 
          aPoint[1] >= minY && aPoint[1] <= maxY && 
          aPoint[2] >= minZ && aPoint[2] <= maxZ)
}

let maxX = Math.max(...points.map(pt => pt[0]))
let maxY = Math.max(...points.map(pt => pt[1]))
let maxZ = Math.max(...points.map(pt => pt[2]))

let minX = Math.min(...points.map(pt => pt[0]))
let minY = Math.min(...points.map(pt => pt[1]))
let minZ = Math.min(...points.map(pt => pt[2]))

let que: Array<Array<number>> = JSON.parse(JSON.stringify(points));
let seen = new Set<string>();
let airCubes = new Array<Array<number>>();

que.forEach(pt => seen.add(pt.toString()))

while(que.length > 0) {
  
  let airCube = que.pop()
  if(airCube) {

    if(isEmpty(airCube)) 
      airCubes.push(airCube)

    for(let n = 0; n < 6; n++) {
      let neighbour = [ airCube[0] + row[n], 
                        airCube[1] + col[n], 
                        airCube[2] + dep[n] ]

      if(!seen.has(neighbour.toString()) && inBounds(neighbour)) {
        que.push(neighbour)
        seen.add(neighbour.toString())
      }
    }
  }
}

airCubes = airCubes.filter(pt => !points.find(p => p[0] ==pt[0] && p[1] == pt[1] && p[2] == pt[2]))
console.log(4456 - airCubes.length*6)