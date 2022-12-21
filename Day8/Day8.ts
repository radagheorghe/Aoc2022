import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day8/input.txt");
var input1 = new InputFile("./day8/input1.txt");

let grid = new Array<Array<Number>>();

input.getAsLines().forEach(line => {
    grid.push(line.split('').map(nr => Number(nr)));
})

const edgeX = grid[0].length;
const edgeY = grid.length;

let visibleSum = edgeX * 2 + edgeY * 2 - 4;

let score = 0;
function isVisible(aX: number, aY: number): boolean {

  let localScore = 1;
  
  let vLeft = aX - 1;
  for(; vLeft >= 0; vLeft--)
    if(grid[aY][vLeft] >= grid[aY][aX])
      break;
 
  localScore *= aX - (vLeft < 0 ? 0 : vLeft);
  
  let vRight = aX + 1;
  for(; vRight < edgeX; vRight++)
    if(grid[aY][vRight] >= grid[aY][aX])
      break;

  localScore *= (vRight > edgeX - 1 ? edgeX - 1 : vRight) - aX;
  
  let vTop = aY - 1;
  for(; vTop >= 0; vTop--)
  if(grid[vTop][aX] >= grid[aY][aX])
      break;

  localScore *= aY - (vTop < 0 ? 0 : vTop);
  
  let vBottom = aY + 1;
  for(; vBottom < edgeY; vBottom++)
    if(grid[vBottom][aX] >= grid[aY][aX])
      break;

  localScore *= (vBottom > edgeY - 1 ? edgeY - 1 : vBottom) - aY;
  
  if(localScore > score)
    score = localScore;

  return vLeft == -1 || vRight == edgeX || vTop == -1 || vBottom == edgeY;
}

//isVisible(2, 1);

for(let y = 1; y < grid.length - 1; y++)
  for(let x = 1; x < grid[0].length - 1; x++) {
    visibleSum += isVisible(x, y) ? 1 : 0
  }

console.log(visibleSum)
console.log(score)