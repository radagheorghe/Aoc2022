import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day3/input.txt");
var input1 = new InputFile("./day3/input1.txt");

let sum = 0;
let lines = input.getAsLines()

for(let i = 0; i < lines.length; i += 3) {

    let comp1 = lines[i].split('')//line.slice(0, line.length/2).split('');
    let comp2 = lines[i+1].split('')//line.slice(line.length/2, line.length).split('');
    let comp3 = lines[i+2].split('')

    let union = comp1.filter(elem => {        
        let exist = comp2.includes(elem) && comp3.includes(elem)
        comp2 = comp2.filter(e => e != elem) 
        comp3 = comp3.filter(e => e != elem) 
        return exist
    } );

    //console.log(union)
    sum += union.map(s => s.charCodeAt(0) - (s.toLowerCase() === s ? 96 : 38)).reduce((acc, val) => acc + val, 0);
}

console.log(sum)