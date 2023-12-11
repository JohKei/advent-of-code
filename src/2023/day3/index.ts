import { link } from "fs";
import { Day } from "../../day";

class Day3 extends Day {
	constructor() {
		super(3);
	}

	solveForPartOne(input: string): string {
		solutionOne(input);
		return "";
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

let regexSymbols = new RegExp("\\W", "g");
let regexRules = new RegExp("[^0-9.]", "g");

const solutionOne = (input: string) => {
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
		let prevLine: string | "" = "";
		let currentLine: string | "" = "";
		let nextLine: string | "" = "";
		let endIndex = () => {
			return number.indexEnd === lineLength ? number.indexEnd : number.indexEnd + 1;
		};
		const getLine = () => {
			if (number.line === 0) {
				prevLine = "";
				currentLine = lines[number.line].slice(startIndex, endIndex() + 1);
				nextLine = lines[number.line + 1].slice(startIndex, endIndex() + 1);
			} else if (number.line === lineLength) {
				nextLine = "";
				currentLine = lines[number.line].slice(startIndex, endIndex() + 1);
				prevLine = lines[number.line - 1].slice(startIndex, endIndex() + 1);
			} else {
				prevLine = lines[number.line - 1].slice(startIndex, endIndex() + 1);
				currentLine = lines[number.line].slice(startIndex, endIndex() + 1);
				nextLine = lines[number.line + 1].slice(startIndex, endIndex() + 1);
			}
		};
		getLine();
		let matchPrev = prevLine.match(regexRules);
		let matchCurrent = currentLine.match(regexRules);
		let matchNext = nextLine.match(regexRules);
		if (matchPrev !== null && matchPrev.length > 0) number.isValid = true;
		if (matchCurrent !== null && matchCurrent.length > 0) number.isValid = true;
		if (matchNext !== null && matchNext.length > 0) number.isValid = true;

		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log(prevLine, "prevLine", "regexTest-", prevLine.match(regexRules));
		console.log(currentLine, "currentLine", "regexTest-", currentLine.match(regexRules));
		console.log(nextLine, "nextLine", "regexTest-", nextLine.match(regexRules));
		console.log("");
		// test currentLine
		// console.log("index-start", startIndex);
		// console.log("index-end", endIndex());
		// console.log("line length", lineLength);
		// console.log("has Duplicate", duplicatedNumbers.includes(number.number.toString()));
		// console.log("is Valid", number.isValid);
		console.log(number);
	});

	let solution = 0;
	let validNumbers = allNumbers.map((number) => (number.isValid ? number.number : 0));
	validNumbers.forEach((number) => solution += number)
	console.log(solution)
};
