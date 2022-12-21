import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day5/input.txt");
var input1 = new InputFile("./day5/input1.txt");

let movesCount = 0;
let stacks = new Array<Array<String>>();

input.getAsLines().forEach(strLine => {
	
	const re = /\d+/g;
	const movesMatch = strLine.match(re);
	if(movesMatch) {

	  // do the moves
	  let moves = movesMatch.map(nr => Number(nr));
	  if(movesCount === 0) {

		for(let i = 0; i < stacks.length; i++)
		  stacks[i] = stacks[i].reverse();
	  }
	  else if(movesCount > 0) {
				
		let temp = new Array<String>();
		for(let i = 0; i < moves[0]; i++) {
		  let moved = stacks[moves[1] - 1].pop();
		  if(moved)
		    temp.push(moved);
		}
		temp = temp.reverse();
		for(let i = 0; i < temp.length; i++)
		  stacks[moves[2] - 1].push(temp[i]);
	  }
	  movesCount++;
	}
	else {
	  // parse initial stacks configuration
	  let line = new Array<String>();
	  for(let i = 0; i < strLine.length; i += 4) {

		let elem = strLine.slice(i, i + 3).trim().replace('[', '').replace(']', '');        
		line.push(elem);
	  }
	  
	  for(let j = 0; j < line.length; j++) {
		if(stacks[j]) {
		  if(line[j].length > 0)
			stacks[j].push(line[j])
		}
		else {
		  stacks.push(new Array<String>());
		  if(line[j].length > 0)
			stacks[j].push(line[j])
		}
	  }
	}
})

let res = ''
for(let i = 0; i < stacks.length; i++)
  res += stacks[i][stacks[i].length - 1]
 
console.log(res)