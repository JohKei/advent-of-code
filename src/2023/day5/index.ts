import { Day } from "../../day";
import { splitInput, splitStringIntoNumbers } from "../../reusable/splitting";

class Day5 extends Day {
	constructor() {
		super(5);
	}

	solveForPartOne(input: string): string {
		return solutionOne(input);
	}

	solveForPartTwo(input: string): string {
		return input;
	}
}

export default new Day5();

type Map = {
	[key: string]: { [key: string]: any };
};

const mapNames = [
	"seed-to-soil map:",
	"soil-to-fertilizer map:",
	"fertilizer-to-water map:",
	"water-to-light map:",
	"light-to-temperature map:",
	"temperature-to-humidity map:",
	"temperature-to-humidity map:",
	"humidity-to-location map:",
];

type Seed = {
	[key: string]: SeedLocations;
};

class SeedLocations {
	soil: number = 0;
	fertilizer: number = 0;
	water: number = 0;
	light: number = 0;
	temperature: number = 0;
	humidity: number = 0;
	location: number = 0;
}
const maps: Map = {};
const seeds: Seed[] = [];

const solutionOne = (input: string) => {
	let lines = splitInput(input);
	let splittedSeeds:number[] = splitStringIntoNumbers(lines[0]);

	lines.splice(0, 1);
	lines = lines.filter((line) => line !== "");

	mapMaps(lines);

	splittedSeeds.forEach((seed) => {
		seeds.push({[seed]: new SeedLocations()})
	});

	console.log(seeds, maps)
	return "hello";
};

const mapMaps = (lines: string[]) => {
	let currentLine = "";
	let currentNumbers = 0;
	lines.forEach((line) => {
		if (line !== "" && !mapNames.includes(line)) currentNumbers++;

		if (mapNames.includes(line)) {
			currentNumbers = 0;
			currentLine = mapNames[mapNames.indexOf(line)];
			maps[currentLine] = {};
		} else {
			maps[currentLine][currentNumbers] = splitStringIntoNumbers(line);
		}
	});
};

// class MapNames {
// 	"seed-to-soil map:": Map = {};
// 	"soil-to-fertilizer map:": Map = {};
// 	"fertilizer-to-water map:": Map = {};
// 	"water-to-light map:": Map = {};
// 	"light-to-temperature map:": Map = {};
// 	"temperature-to-humidity map:": Map = {};
// 	"humidity-to-location map:": Map = {};
// }
