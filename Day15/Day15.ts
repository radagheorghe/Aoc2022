import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day15/input.txt");
var input1 = new InputFile("./day15/input1.txt");

type Point = {x: number, y:number};
type SensorBeacon = {s: Point, b: Point}

let sensors = new Array<SensorBeacon>();

input.getAsLines().forEach(line => {

    const re = /-?\d+/g;
    const sensorsMatch = line.match(re);
    if(sensorsMatch) {
        let points = sensorsMatch.map(nr => Number(nr));
        sensors.push({s: {x: points[0], y: points[1]}, b: {x: points[2], y: points[3]}})        
    }
})

sensors.sort((a, b) => (b.s.y- a.s.y))

const manhatanDist = function(a: Point, b: Point): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

let found = false
for(let y = 3020000; y >= 0 && !found; y--) {
  if(y % 1000 == 0)
    console.log(y)
for(let x = 4000000; x >= 2000000; x--) {
    let newPos = {x: x, y: y};
    
    let count = 0;
    for(let i = 0; i < sensors.length; i++) {
        let coverage = manhatanDist(sensors[i].s, sensors[i].b);
             
        if(manhatanDist(sensors[i].s, newPos) > coverage)
          count++
        else
          break
    }

    if(count == sensors.length) {
      console.log(x * 4000000 + y)
      found = true
      break
    }
}
}
