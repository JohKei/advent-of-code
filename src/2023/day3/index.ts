import { Day } from "../../day";

class Day3 extends Day {
	constructor() {
		super(3);
	}

	solveForPartOne(input: string): string {
		// valid numbers n-1 , n , n+1

		let regexSymbols = new RegExp("\\W", "g");
		let regexRules = new RegExp("[-#$%&*/@+=]", "g");
		// let regexRules = new RegExp("[^a-zA-Z0-9.\\s]", "g");

		let lines = input.split("\n");

		let numbersPerLineStrings = lines.map((line) => line.split(regexSymbols).filter((value) => value !== ""));
		let duplicatedNumbers: string[] = [];
		let allNumbers: InputNumber[] = [];

		lines.forEach((line, indexOfLine) => {
			numbersPerLineStrings[indexOfLine].forEach((number) => {
				if (numbersPerLineStrings[indexOfLine].filter((value) => value === number).length > 1) {
					// console.log('duplicate......', number, line)
					duplicatedNumbers.push(number);
					allNumbers.push(new InputNumber(indexOfLine, +number, line.indexOf(number)));
					allNumbers.push(new InputNumber(indexOfLine, +number, line.lastIndexOf(number)));
				} else {
					allNumbers.push(new InputNumber(indexOfLine, +number, line.indexOf(number)));
				}
			});
		});

		allNumbers.forEach((number) => {
			let startIndex = number.indexStart === 0 ? 0 : number.indexStart - 1;
			let endIndex = number.indexEnd;
			let prevLine = number.line === 0 ? null : number.line - 1;
			let nextLine = number.line === lines.length - 1 ? null : number.line + 1;

			if (prevLine) {
				if (regexRules.test(lines[prevLine].slice(startIndex, endIndex + 1))) {
					number.isValid = true;
				}
			}
			if (regexRules.test(lines[number.line].slice(startIndex, endIndex + 1))) {
				number.isValid = true;
			}
			if (nextLine) {
				if (regexRules.test(lines[nextLine].slice(startIndex, endIndex + 1))) {
					number.isValid = true;
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

			// 	console.log("");
			// console.log("");
			// console.log("");
			// console.log("");
			// console.log("");
			// console.log("");
			// if (prevLine) console.log(lines[prevLine]);
			// console.log(lines[number.line]);
			// if (nextLine) console.log(lines[nextLine]);
			// console.log("");
			// if (prevLine) console.log(lines[prevLine].slice(startIndex, endIndex + 1), "prevLine");
			// console.log(lines[number.line].slice(startIndex, endIndex + 1), "currentLine");
			// if (nextLine) console.log(lines[nextLine].slice(startIndex, endIndex + 1), "nextLine");
			// console.log("");
			// // test currentLine
			// console.log("has Duplicate", duplicatedNumbers.includes(number.number.toString()));
			// console.log("is Valid", number.isValid);
			// console.log("");

			// console.log(number);

			// if (lines[number.line].slice(startIndex, endIndex) === '.776*'){
			//     console.log(lines[number.line][endIndex-1])
			//     console.log(regexRules.test(lines[number.line][endIndex-1]));
			// }
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

		this.indexEnd = indexStart + this.number.toString().length;
	}
}
