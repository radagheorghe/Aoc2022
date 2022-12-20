import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day10/input.txt");
var input1 = new InputFile("./day10/input1.txt");

let cycle = 0;
let X = 1;

let log = new Array<number>();
log.push(X);

input.getAsLines().forEach(line => {
  
  let instruction = line.split(' ');

  switch(instruction[0]) {
    case 'noop':
      cycle++;
      log.push(X);
      break;
    case 'addx':
      cycle++;
      log.push(X);
      cycle++;
      log.push(X);
      X += Number(instruction[1]);
      break;
  }
});

let sum = 0;
for(cycle = 20; cycle <= 220; cycle += 40)
  sum += cycle*log[cycle]

console.log(sum)

let output = '';
let crtRow = 1;
for(cycle = 1; cycle <= 240; cycle++, crtRow++) {

  let sprite = [log[cycle], log[cycle] + 1, log[cycle] + 2];

  if(sprite.includes(crtRow))
    output += '#'
  else
    output += '.';

  if(cycle % 40 == 0) {
    output += '\n';
    crtRow = 0;
  }
}

console.log(output)