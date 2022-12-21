import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day4/input.txt");
var input1 = new InputFile("./day4/input1.txt");

let sum = 0, sum1 = 0;
input.getAsLines().forEach(line => {
    
    let elf = line.split(',');

    let elf1 = elf[0].split('-').map(nr => Number(nr));
    let elf2 = elf[1].split('-').map(nr => Number(nr));

    if((elf1[0] <= elf2[0] && elf1[1] >= elf2[1]) || 
       (elf1[0] >= elf2[0] && elf1[1] <= elf2[1]))
         sum++;

    if(elf1[0] <= elf2[1] && elf1[1] >= elf2[0])
        sum1++;        
});

console.log(sum, sum1)