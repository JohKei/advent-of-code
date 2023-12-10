import { Day } from "../../day";

class Day3 extends Day {
	constructor() {
		super(3);
	}

	solveForPartOne(input: string): string {
		let regexSymbols = new RegExp("\\W", "g");
		// Bug: this regex is completely buggy..
		let regexRules = new RegExp("[^0-9\\.]|\\*", "g");

		let lines = input.split("\n");

		let numbersPerLineStrings = lines.map((line) => line.split(regexSymbols).filter((value) => value !== ""));
		let duplicatedNumbers: string[] = [];
		let allNumbers: InputNumber[] = [];

		lines.forEach((line, indexOfLine) => {
			let numberToSkip: string;
			numbersPerLineStrings[indexOfLine].forEach((number) => {
				if (numberToSkip === number) {
					numberToSkip = "";
				} else if (numbersPerLineStrings[indexOfLine].filter((value) => value === number).length > 1) {
					allNumbers.push(new InputNumber(indexOfLine, +number, line.indexOf(number)));
					allNumbers.push(new InputNumber(indexOfLine, +number, line.lastIndexOf(number)));
					numberToSkip = number;
				} else {
					allNumbers.push(new InputNumber(indexOfLine, +number, line.indexOf(number)));
				}
			});
		});

		allNumbers.forEach((number) => {
			let startIndex = number.indexStart === 0 ? 0 : number.indexStart - 1;
			let lineLength = lines[number.line].length - 1;
			let prevLine: string | null = null;
			let currentLine: string | null = null;
			let nextLine: string | null = null;
			let endIndex = () => {
				return number.indexEnd === lineLength ? number.indexEnd : number.indexEnd + 1;
			};
			const getLine = () => {
				if (number.line === 0) {
					prevLine = null;
					currentLine = lines[number.line].slice(startIndex, endIndex()+ 1);
					nextLine = lines[number.line + 1].slice(startIndex, endIndex()+ 1);
				} else if (number.line === lineLength) {
					nextLine = null;
					currentLine = lines[number.line].slice(startIndex, endIndex()+ 1);
					prevLine = lines[number.line - 1].slice(startIndex, endIndex()+ 1);
				} else {
					prevLine = lines[number.line - 1].slice(startIndex, endIndex()+ 1);
					currentLine = lines[number.line].slice(startIndex, endIndex()+ 1);
					nextLine = lines[number.line + 1].slice(startIndex, endIndex()+ 1);
				}
			};
			getLine();

			if (prevLine){
				if (regexRules.test(prevLine)){
					number.isValid = true
				}
			}
			if (currentLine) {
				if (regexRules.test(currentLine)) {
					number.isValid = true;
				}
			}

			if (nextLine) {
				if (regexRules.test(nextLine)) {
					number.isValid = true;
				}
			}
			console.log("");
			console.log("");
			console.log("");
			console.log("");
			console.log("");
			console.log(prevLine, "prevLine");
			console.log(currentLine, "currentLine");
			console.log(nextLine, "nextLine");
			console.log("");
			// test currentLine
			// console.log("index-start", startIndex);
			// console.log("index-end", endIndex());
			// console.log("line length", lineLength);
			console.log("has Duplicate", duplicatedNumbers.includes(number.number.toString()));
			console.log("is Valid", number.isValid);
			console.log("");

			// console.log(number);
		});
		let solution = 0;
		allNumbers.filter((number) => number.isValid).forEach((number) => (solution += number.number));
		return solution.toString();
	}

	solveForPartTwo(input: string): string {
		return input;
	}
}

export default new Day3();

export class InputNumber {
	line: number;
	number: number;
	indexStart: number;
	indexEnd: number;
	isValid: boolean = false;

	constructor(line: number, inputNumber: number, indexStart: number) {
		this.line = line;
		this.number = inputNumber;
		this.indexStart = indexStart;

		this.indexEnd = indexStart + this.number.toString().length - 1;
	}
}

// if (regexRules.test(lines[number.line][startIndex])) {
// 	number.isValid = true;
// }
// if (regexRules.test(lines[number.line][endIndex])) {
// 	number.isValid = true;
// 	// console.log(lines[number.line]);
// 	// console.log(number);
// }
// // test previousLine
// if (prevLine !== null) {
// 	for (let i = startIndex; i <= endIndex; i++) {
// 		if (regexRules.test(lines[prevLine][i])) {
// 			number.isValid = true;
// 			continue;
// 		}
// 	}
// }
// //test nextLine
// if (nextLine !== null) {
// 	for (let i = startIndex; i <= endIndex; i++) {
// 		if (regexRules.test(lines[nextLine][i])) {
// 			number.isValid = true;
// 			continue;
// 		}
// 	}
// }

// if (lines[number.line].slice(startIndex, endIndex) === '.776*'){
//     console.log(lines[number.line][endIndex-1])
//     console.log(regexRules.test(lines[number.line][endIndex-1]));
// }
