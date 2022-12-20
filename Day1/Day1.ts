import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day1/input.txt");

let elvesCalories = input.getAsGroups().map(cals => cals.split(' ')
                                       .map(cal => Number(cal))
                                       .reduce((acc, val) => { return acc + val; }, 0 ))

elvesCalories.sort((a, b) => b - a);

console.log(elvesCalories[0])
console.log(elvesCalories[0] + elvesCalories[1] + elvesCalories[2]);
