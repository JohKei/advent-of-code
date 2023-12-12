import { log } from "console";
import { Day } from "../../day";

class Day3 extends Day {
	constructor() {
		super(3);
	}

	solveForPartOne(input: string): string {
		return solutionOne(input);
	}

	solveForPartTwo(input: string): string {
		return solutionTwo(input);
	}
}

export default new Day3();

export class InputNumber {
	prevLine: string;
	currentLine: string;
	nextLine: string;
	indexOfCurrentLine: number;
	number: number;
	isValid: boolean = false;
	numberIndices: number[] = [];

	constructor(inputNumber: number, prevLine: string, currentLine: string, nextLine: string, indexOfCurrentLine: number, indexStart: number) {
		this.prevLine = prevLine;
		this.currentLine = currentLine;
		this.nextLine = nextLine;
		this.number = inputNumber;
		this.indexOfCurrentLine = indexOfCurrentLine;

		let numberLength = inputNumber.toString().length;
		for (let i = indexStart; i < indexStart + numberLength; i++) {
			this.numberIndices.push(i);
		}
	}
}

export class Match {
	row: number;
	column: number;

	constructor(row: number, col: number) {
		this.row = row;
		this.column = col;
	}
}

let regexSymbols = new RegExp("\\W", "g");
let regexRules = new RegExp("[^0-9.]", "g");
let regexStar = new RegExp("[*]", "g");

const getAllNumbers = (lines: string[]) => {
	let allNumbers: InputNumber[] = [];

	let numbersPerLineStrings = lines.map((line) => line.split(regexSymbols).filter((value) => value !== ""));

	lines.forEach((line, indexOfLine) => {
		numbersPerLineStrings[indexOfLine].forEach((number) => {
			let startIndexOfNumber = line.indexOf(number);
			let endIndexOfNumber = startIndexOfNumber + (number.length - 1);
			let lineLength = line.length - 1;

			let startOfStringToCheck = startIndexOfNumber === 0 ? 0 : startIndexOfNumber - 1;
			let endOfStringToCheck = endIndexOfNumber === lineLength ? endIndexOfNumber + 1 : endIndexOfNumber + 2;

			let prevLine = "";
			let currentLine = "";
			let nextLine = "";
			const getLine = () => {
				if (indexOfLine === 0) {
					prevLine = "";
					currentLine = lines[indexOfLine].slice(startOfStringToCheck, endOfStringToCheck);
					nextLine = lines[indexOfLine + 1].slice(startOfStringToCheck, endOfStringToCheck);
				} else if (indexOfLine === lineLength) {
					nextLine = "";
					currentLine = lines[indexOfLine].slice(startOfStringToCheck, endOfStringToCheck);
					prevLine = lines[indexOfLine - 1].slice(startOfStringToCheck, endOfStringToCheck);
				} else {
					prevLine = lines[indexOfLine - 1].slice(startOfStringToCheck, endOfStringToCheck);
					currentLine = lines[indexOfLine].slice(startOfStringToCheck, endOfStringToCheck);
					nextLine = lines[indexOfLine + 1].slice(startOfStringToCheck, endOfStringToCheck);
				}
			};
			getLine();
			allNumbers.push(new InputNumber(+number, prevLine, currentLine, nextLine, indexOfLine, startIndexOfNumber));
			for (let i = startIndexOfNumber; i < endIndexOfNumber + 1; i++) {
				line = line.substring(0, i) + "." + line.substring(i + 1);
			}
		});
	});
	return allNumbers;
};

const solutionOne = (input: string) => {
	let lines = input.split("\n");

	const allNumbers = getAllNumbers(lines);

	allNumbers.forEach((number) => {
		let matchPrev = number.prevLine.match(regexRules);
		let matchCurrent = number.currentLine.match(regexRules);
		let matchNext = number.nextLine.match(regexRules);
		if (matchPrev !== null && matchPrev.length > 0) number.isValid = true;
		if (matchCurrent !== null && matchCurrent.length > 0) number.isValid = true;
		if (matchNext !== null && matchNext.length > 0) number.isValid = true;
	});

	let solution = 0;
	let validNumbers = allNumbers.map((number) => (number.isValid ? number.number : 0));
	validNumbers.forEach((number) => (solution += number));
	return solution.toString();
};

const solutionTwo = (input: string) => {
	const lines = input.split("\n");
	const allNumbers = getAllNumbers(lines);
	let matches: Array<Match[]> = [];

	for (let row = 0; row < lines.length; row++) {
		for (let column = 0; column < lines[row].length; column++) {
			let currentCharacter = lines[row][column];
			let starMatch = currentCharacter.match(regexStar);

			if (starMatch !== null && starMatch.length > 0) {
				// console.log("matched character", currentCharacter);
				// console.log(lines[row].slice(column - 2, column + 3));
				let localMatches: Match[] = [];
				// start checking surroundings
				// check horizontal left
				// if (row === 7 && column ===6){
				// 	console.log('wwwwwwwwwttttttttccccccccc')
				// 	console.log(lines[row].slice(column-2, column+3))
				// 	console.log(lines[row][column-1])
				// 	console.log(!isNaN(+lines[row][column-1]))
				// }
				if (!isNaN(+lines[row][column - 1])) {
					localMatches.push(new Match(row, (column - 1)));
				}
				// check horizontal right
				if (!isNaN(+lines[row][column + 1])) {
					localMatches.push(new Match(row, (column +1)));
				}
				// check horizontal above
				if (row > 0) {
					for (let col = column - 1; col < column + 2; col++) {
						if (!isNaN(+lines[row - 1][col])) {
							localMatches.push(new Match(row - 1, col));
						}
					}
				}
				// check horizontal below
				for (let col = column - 1; col < column + 2; col++) {
					if (!isNaN(+lines[row + 1][col])) {
						localMatches.push(new Match(row + 1, col));
					}
				}

				if (localMatches.length > 1) matches.push(localMatches);
			}
		}
	}

	let solution = 0;

	matches.forEach((potentialMatch) => {
		let rowCoordinates: number[] = [];
		let colCoordinates: number[] = [];

		potentialMatch.forEach((coordinate) => {
			if (!rowCoordinates.includes(coordinate.row)) rowCoordinates.push(coordinate.row);
			if (!colCoordinates.includes(coordinate.column)) colCoordinates.push(coordinate.column);
		});

		let realMatch = allNumbers.filter((number) => {
			if (rowCoordinates.includes(number.indexOfCurrentLine) && colCoordinates.some((r) => number.numberIndices.includes(r))) {
				return number;
			}
		});
		// console.log("");
		// console.log("");
		// console.log("");
		// console.log("");
		// console.log("");

		// console.log("rowCoords", rowCoordinates);
		// console.log("colCoords", colCoordinates);
		// console.log('')
		// console.log("realMatch", realMatch);
		if (realMatch.length === 2) {
			console.log(realMatch)
			let matchNumber = 1;
			realMatch.forEach((number) => {
				matchNumber = number.number * matchNumber;
			});
			console.log(matchNumber)
			solution += matchNumber;
		}
		// console.log('potential-match', potentialMatch)
	});

	// console.log(matches, realMatches);

	return solution.toString();
};
