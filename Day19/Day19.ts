import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day19/input.txt");
var input1 = new InputFile("./day19/input1.txt");

enum Costs {
    Ore = 0,
    Clay,
    Obsidium,
    ObsidiumClay,
    Geode,
    GeodeObsidium
}

class Blueprint {
    private mCosts: Array<number>
    
    public mOreRobots: number
    public mClayRobots: number
    public mObsidiumRobots: number
    public mGeodeRobots: number
    
    public mOre: number
    public mClay: number
    public mObsidium: number
    public mGeode: number

    constructor(aCosts: Array<number>) {
        this.mCosts = aCosts
        this.mOreRobots = 1
        this.mClayRobots = this.mObsidiumRobots = this.mGeodeRobots = 0
        this.mOre = this.mClay = this.mObsidium = this.mGeode = 0
    }    

    public run() {
        let newGeodeRobots = 0
        if(this.mOre >= this.mCosts[Costs.Geode] && this.mObsidium >= this.mCosts[Costs.GeodeObsidium]) {
            this.mOre -= this.mCosts[Costs.Geode]
            this.mObsidium -= this.mCosts[Costs.GeodeObsidium]
        }
        let newObsidiumRobbots = 0
        if(this.mOre >= this.mCosts[Costs.Obsidium] && this.mClay >= this.mCosts[Costs.ObsidiumClay]) {
            this.mOre -= this.mCosts[Costs.Obsidium]
            this.mClay -= this.mCosts[Costs.ObsidiumClay]
            newObsidiumRobbots ++
        }
        let newClayRobbots = 0
        if(this.mOre >= this.mCosts[Costs.Clay]) {
            this.mOre -= this.mCosts[Costs.Clay]
            newClayRobbots ++
        }
        this.mOre += this.mOreRobots
        this.mClay += this.mClayRobots
        this.mObsidium += this.mObsidiumRobots
        this.mGeode += this.mGeodeRobots

        this.mClayRobots += newClayRobbots
        this.mObsidiumRobots += newObsidiumRobbots
        this.mGeodeRobots += newGeodeRobots
    }
}

let bluePrints = new Array<Blueprint>()

input1.getAsLines().forEach(line => {
    const re = /\d+/g;
	const match = line.match(re);
	if(match) {
      bluePrints.push(new Blueprint([Number(match[1]), Number(match[2]), 
        Number(match[3]), Number(match[4]), Number(match[5]), Number(match[6])]))
    }
})

for(let i = 0; i < 24; i++) bluePrints[0].run()
    //bluePrints.forEach(bluePrint => bluePrint.run())

console.log(bluePrints.map((bluePrint, idx) => idx * bluePrint.mGeode).reduce((vall, acc) => vall + acc, 0))