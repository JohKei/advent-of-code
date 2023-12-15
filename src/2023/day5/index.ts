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
let seedNumbers = [];

const solutionOne = (input: string) => {
	let lines = splitInput(input);
	let seedNumbers = splitStringIntoNumbers(lines[0]);

	lines.splice(0, 1);
	lines = lines.filter((line) => line !== "");

	mapMaps(lines);

	seedNumbers.forEach((seed) => {
		seeds.push({ [seed]: new SeedLocations() });
	});

	calculateRanges();
	// console.log(seeds, maps)
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

const calculateRanges = () => {
	// console.log(maps)
	for (let key in maps) {
		if (maps.hasOwnProperty(key)) {
			// console.log(key)

			for (let map in maps[key]) {
				// console.log(maps[key][map], maps[key])
				// Important [0] = destinationRangeStart
				// Important [1] = sourceRangeStart
				// Important range = is start+range - 1 -> I don't need to do this because Array.from() already returns this the right way
				let range = maps[key][map][2];
				let sourceRangeStart = maps[key][map][1];
				let sourceRangeEnd = maps[key][map][1] + range;
				let destinationRangeStart = maps[key][map][0];
				let destinationRangeEnd = maps[key][map][0] + range;
				// console.log("source-range-start", sourceRangeStart);
				// console.log("source-range-end", sourceRangeEnd);
				// console.log("destination-range-start", destinationRangeStart);
				// console.log("destination-range-end", destinationRangeEnd);

				maps[key][`source-range-${map}`] = Array.from(
					{ length: sourceRangeEnd - sourceRangeStart / 1 },
					(value, index) => sourceRangeStart + index * 1
				);

				maps[key][`destination-range-${map}`] = Array.from(
					{ length: destinationRangeEnd - destinationRangeStart / 1 },
					(value, index) => destinationRangeStart + index * 1
				);
			}
		}
	}
	// console.log(maps)
};

const assignRangesToSeeds = (seeds: Seed, maps: Map) => {};
