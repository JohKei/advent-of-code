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
		return solutionTwo(input);
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
	"humidity-to-location map:",
];

type Seed = {
	[key: string]: SeedLocations;
};

class SeedLocations {
	"seed-to-soil map:": number = 0;
	"soil-to-fertilizer map:": number = 0;
	"fertilizer-to-water map:": number = 0;
	"water-to-light map:": number = 0;
	"light-to-temperature map:": number = 0;
	"temperature-to-humidity map:": number = 0;
	"humidity-to-location map:": number = 0;
}

type SourceRange = {
	sourceStart: number;
	sourceEnd: number;
};

type DestinationRange = {
	destinationStart: number;
	destinationEnd: number;
};

const maps: Map = {};
const seeds: Seed[] = [];
let seedNumbers: number[] = [];

const solutionOne = (input: string) => {
	let lines = splitInput(input);
	seedNumbers = splitStringIntoNumbers(lines[0]);

	lines.splice(0, 1);
	lines = lines.filter((line) => line !== "");

	mapMaps(lines);

	seedNumbers.forEach((seed) => {
		seeds.push({ [seed]: new SeedLocations() });
	});

	calculateRanges();
	assignRangesToSeeds();

	let seedWithLowestLocation = seeds.reduce((lowest, current) => {
		const lowestLocation = Object.values(lowest)[0]["humidity-to-location map:"];
		const currentLocation = Object.values(current)[0]["humidity-to-location map:"];

		return lowestLocation < currentLocation ? lowest : current;
	});

	return seedWithLowestLocation[Object.keys(seedWithLowestLocation)[0]]["humidity-to-location map:"].toString();
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
	for (let key in maps) {
		if (maps.hasOwnProperty(key)) {
			for (let map in maps[key]) {
				let range = maps[key][map][2];
				let sourceRangeStart = maps[key][map][1];
				let sourceRangeEnd = maps[key][map][1] + range - 1;
				let destinationRangeStart = maps[key][map][0];
				let destinationRangeEnd = maps[key][map][0] + range - 1;

				maps[key][`source-range-${map}`] = { sourceStart: sourceRangeStart, sourceEnd: sourceRangeEnd };

				maps[key][`destination-range-${map}`] = { destinationStart: destinationRangeStart, destinationEnd: destinationRangeEnd };
				delete maps[key][map];
			}
		}
	}
	// console.log(maps)
};

const assignRangesToSeeds = () => {
	seeds.forEach((seed) => {
		for (let key in seed) {
			if (seed.hasOwnProperty(key)) {
				let sourceRanges = [];
				let destinations = [];
				let matchingIndex: SourceRange = { sourceStart: 0, sourceEnd: 0 };
				let source = +key;

				mapNames.forEach((keyString) => {
					if (seed[key].hasOwnProperty(keyString)) {
						seed[key][keyString as keyof SeedLocations];
						sourceRanges = Object.keys(maps[keyString]).filter((mapKey) => mapKey.match("source-range"));
						destinations = Object.keys(maps[keyString]).filter((mapKey) => mapKey.match("destination-range"));

						for (let i = 0; i < sourceRanges.length; i++) {
							Object.assign(matchingIndex, maps[keyString][sourceRanges[i]]);

							if (source >= matchingIndex.sourceStart && source <= matchingIndex.sourceEnd) {
								let difference = source - matchingIndex.sourceStart
								source = maps[keyString][destinations[i]].destinationStart + difference
								seed[key][keyString as keyof SeedLocations] = source
								i = sourceRanges.length

							} else {
								seed[key][keyString as keyof SeedLocations] = source;
							}
						}
					}
				});
			}
		}
	});
};


const solutionTwo = (input:string) => {
	let lines = splitInput(input);

	

	// seedNumbers = splitStringIntoNumbers(lines[0]);

	lines.splice(0, 1);
	lines = lines.filter((line) => line !== "");

	mapMaps(lines);

	seedNumbers.forEach((seed) => {
		seeds.push({ [seed]: new SeedLocations() });
	});

	calculateRanges();
	assignRangesToSeeds();

	let seedWithLowestLocation = seeds.reduce((lowest, current) => {
		const lowestLocation = Object.values(lowest)[0]["humidity-to-location map:"];
		const currentLocation = Object.values(current)[0]["humidity-to-location map:"];

		return lowestLocation < currentLocation ? lowest : current;
	});

	return seedWithLowestLocation[Object.keys(seedWithLowestLocation)[0]]["humidity-to-location map:"].toString();
} 