import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day12/input.txt");
var input1 = new InputFile("./day12/input1.txt");

class Point {

    public mX: number;
    public mY: number;

    constructor(aX: number, aY: number) {
        this.mX = aX;
        this.mY = aY;
    }    
}

let maze = new Array<Array<String>>();
let start: Point
let stop: Point

function testPoint(aNew: Point, aCurrent: Point): boolean {
    if(aNew.mX < 0 || aNew.mX >= maze[0].length || aNew.mY < 0 || aNew.mY >= maze.length)
        return false;

    let elevation = maze[aNew.mY][aNew.mX].charCodeAt(0) - maze[aCurrent.mY][aCurrent.mX].charCodeAt(0);
    return elevation <= 1;
}

function findShortestPath(aStart: Point): number
{
    let row = [ -1, 0, 0, 1 ];
    let col = [ 0, -1, 1, 0 ];

    let visited = new Array<Array<boolean>>();
    for(let y = 0; y < maze.length; y ++)
        visited.push(new Array<boolean>(maze[0].length).fill(false));

    let q = new Array<{xy: Point, cost: number}>();

    visited[aStart.mY][aStart.mX] = true;
    q.push({xy: aStart, cost: 0});

    while (q.length != 0)
    {
        q.sort((a, b) => b.cost - a.cost);
        let node = q.pop();
        if(!node)
          break;

        let crPos = node.xy;
        let dist = node.cost;
                
        if (crPos.mX == stop.mX && crPos.mY == stop.mY)
          return dist;

        for (let k = 0; k < 4; k++)
        {
            let newPos = new Point(crPos.mX + row[k], crPos.mY + col[k]);
            if (testPoint(newPos, crPos) && !visited[newPos.mY][newPos.mX])
            {
                visited[newPos.mY][newPos.mX] = true;   
                let newCost = dist + 1;             
                q.push({xy: newPos, cost: newCost});
            }
        }
    }

    return -1;
}

let y = 0
input.getAsLines().forEach(line => {
    let l = line.split('');    
    let startX = l.findIndex(v => v === 'S');
    let stopX = l.findIndex(v => v === 'E');   
    maze.push(l);
    if(startX > -1) {
      start = new Point(startX, y);
      maze[start.mY][start.mX] = 'a';
    }
    if(stopX > -1) {
      stop = new Point(stopX, y);
      maze[stop.mY][stop.mX] = 'z';
    }
    
    y++;
})

let min = new Array<number>();
for(let y = 0; y < maze.length; y++)
  for(let x = 0; x < maze[0].length; x++)
    if(maze[y][x] === 'a') {
      let path = findShortestPath(new Point(x, y));
      if(path != -1)
        min.push(path)
    }

console.log(Math.min(...min))