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
	number: number;
	isValid: boolean = false;

	constructor(inputNumber: number, prevLine: string, currentLine: string, nextLine: string) {
		this.prevLine = prevLine;
		this.currentLine = currentLine;
		this.nextLine = nextLine;
		this.number = inputNumber;
	}
}

let regexSymbols = new RegExp("\\W", "g");
let regexRules = new RegExp("[^0-9.]", "g");

const solutionOne = (input: string) => {
	let lines = input.split("\n");
	let numbersPerLineStrings = lines.map((line) => line.split(regexSymbols).filter((value) => value !== ""));
	let allNumbers: InputNumber[] = [];

	lines.forEach((line, indexOfLine) => {
		numbersPerLineStrings[indexOfLine].forEach((number) => {
			let startIndexOfNumber = line.indexOf(number);
			let endIndexOfNumber = startIndexOfNumber + (number.length - 1);
			let lineLength = line.length - 1;

			let startOfStringToCheck = startIndexOfNumber === 0 ? 0 : startIndexOfNumber - 1;
			let endOfStringToCheck = endIndexOfNumber === lineLength ? (endIndexOfNumber+ 1) : endIndexOfNumber + 2;

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
			allNumbers.push(new InputNumber(+number, prevLine, currentLine, nextLine));
			for (let i = startIndexOfNumber; i < endIndexOfNumber + 1; i++) {
				line = line.substring(0, i) + "." + line.substring(i + 1);
			}
		});
	});

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
	return solution.toString()
};

const solutionTwo = (input:string) => {


	return 'test'
}