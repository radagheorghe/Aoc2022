import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day2/input.txt");
var input1 = new InputFile("./day2/input2.txt");

enum GameShape {
  unknown,
  Rock,
  Paper,
  Scissors
}

function convert(aShape: string) {

  switch(aShape) {
    case 'A':
    case 'X':
      return GameShape.Rock;
    case 'B':
    case 'Y':
      return GameShape.Paper;
    case 'C':
    case 'Z': 
      return GameShape.Scissors;
  }

  return GameShape.unknown;
}

function compare(aPlayer1: string, aPlayer2: string) {

  let shape1 = convert(aPlayer1);
  let shape2 = convert(aPlayer2);

  if(shape1 == shape2)
    return 3 + shape2;
  else if(shape1 == GameShape.Rock && shape2 == GameShape.Paper)
    return 6 + shape2;
  else if(shape1 == GameShape.Rock && shape2 == GameShape.Scissors)
    return 0 + shape2;
  else if(shape1 == GameShape.Paper && shape2 == GameShape.Rock)
    return 0 + shape2;
  else if(shape1 == GameShape.Paper && shape2 == GameShape.Scissors)
    return 6 + shape2;
  else if(shape1 == GameShape.Scissors && shape2 == GameShape.Rock)
    return 6 + shape2;
  else if(shape1 == GameShape.Scissors && shape2 == GameShape.Paper)
    return 0 + shape2;

  return 0;
}

function getWin(aShape: GameShape) {

  switch(aShape) {
    case GameShape.Rock:
      return GameShape.Paper;
    case GameShape.Paper:
      return GameShape.Scissors;
    case GameShape.Scissors:
      return GameShape.Rock;
  }

  return GameShape.unknown;
}

function getLoss(aShape: GameShape) {

  switch(aShape) {
    case GameShape.Rock:
      return GameShape.Scissors;
    case GameShape.Paper:
      return GameShape.Rock;
    case GameShape.Scissors:
      return GameShape.Paper;
  }

  return GameShape.unknown;
}

function compare2(aPlayer1: string, aPlayer2: string) {

  let shape1 = convert(aPlayer1);

  switch(aPlayer2) {
    case 'X':
      return 0 + getLoss(shape1);
    case 'Y':
      return 3 + shape1;
    case 'Z':
      return 6 + getWin(shape1);
  }

  return 0;
}

let sumP1 = 0;
let sumP2 = 0;
input.getAsLines().forEach(line => {
  let round = line.split(' ');

  sumP1 += compare(round[0], round[1]);
  sumP2 += compare2(round[0], round[1]);
})

console.log(sumP1);
console.log(sumP2);