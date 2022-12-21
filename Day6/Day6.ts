import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day6/input.txt");
var input1 = new InputFile("./day6/input1.txt");

let buffer = input.getContent();

for(let i = 14; i < buffer.length; i++) {

    let marker = buffer.slice(i - 14, i);
    
    const unique = Array.from(new Set(marker));
    if(marker.length == unique.length) {
        console.log(i)
        break;
    }    
}