import { splitInput, splitStringIntoNumbers } from "../../reusable/splitting";

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

	console.log(seedWithLowestLocation);

	return "test";
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
				let sourceRangeEnd = maps[key][map][1] + range;
				let destinationRangeStart = maps[key][map][0];
				let destinationRangeEnd = maps[key][map][0] + range;

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
};

const assignRangesToSeeds = () => {
	seeds.forEach((seed) => {
		for (let key in seed) {
			if (seed.hasOwnProperty(key)) {
				let sourceRanges = [];
				let destinations = [];
				let matchingIndex = 0;
				let source = +key;

				mapNames.forEach((keyString) => {
					if (seed[key].hasOwnProperty(keyString)) {
						seed[key][keyString as keyof SeedLocations];
						sourceRanges = Object.keys(maps[keyString]).filter((mapKey) => mapKey.match("source-range"));
						destinations = Object.keys(maps[keyString]).filter((mapKey) => mapKey.match("destination-range"));

						for (let i = 0; i < sourceRanges.length; i++) {
							matchingIndex = maps[keyString][sourceRanges[i]].indexOf(+source);

							if (matchingIndex !== -1) {
								if (maps[keyString][sourceRanges[i]][matchingIndex] === source) {
									source = maps[keyString][destinations[i]][matchingIndex];
									seed[key][keyString as keyof SeedLocations] = maps[keyString][destinations[i]][matchingIndex];
									i = sourceRanges.length;
								}
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
