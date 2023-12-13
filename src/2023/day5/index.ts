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
	[key: string]: string;
};

class MapNames {
	"seed-to-soil map:": Map = {};
	"soil-to-fertilizer map:": Map = {};
	"fertilizer-to-water map:": Map = {};
	"water-to-light map:": Map = {};
	"light-to-temperature map:": Map = {};
	"temperature-to-humidity map:": Map = {};
	"humidity-to-location map:": Map = {};
}

const mapNames = new MapNames();

const solutionOne = (input: string) => {
	let lines = splitInput(input);
	let seeds = splitStringIntoNumbers(lines[0]);
	lines.splice(0, 1);
	lines = lines.filter((line) => line !== "");
	// console.log(seeds)
	mapMaps(lines);

	return "hello";
};

const mapMaps = (lines: string[]) => {
	// console.log(lines)
	let currentLine = "";
	let currentNumbers = 0;
	lines.forEach((line) => {
		if (line !== "" && !(line in mapNames)) currentNumbers++;
		if (line in mapNames) {
			currentNumbers = 0;

			currentLine = line;
		} else {
			// @ts-ignore
			mapNames[currentLine][currentNumbers] = splitStringIntoNumbers(line);
		}
	});
	console.log(mapNames);
};
