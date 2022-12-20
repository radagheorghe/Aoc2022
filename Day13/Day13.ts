import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day13/input.txt");
var input1 = new InputFile("./day13/input1.txt");

let pairs = new Array<Array<number>();

function trim(aStr: String): String {
  let newStr = aStr;
  if(newStr[0] === '[')
    newStr = newStr.slice(1);
  if(newStr[newStr.length - 1] === ']')
    newStr = newStr.slice(0, newStr.length - 1);

  return newStr;
}

let pairIdx = 0;
input1.getAsGroups('-').forEach(pairs => {
  let pair = pairs.split('-');

  let pair1 = trim(pair[0]).split(',');
  let pair2 = trim(pair[1]).split(',');
})