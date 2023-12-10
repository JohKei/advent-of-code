import { Day } from "../../day";

class Day3 extends Day {
	constructor() {
		super(3);
	}

	solveForPartOne(input: string): string {
		// Information: valid numbers n-1 , n , n+1

		let regexSymbols = new RegExp("\\W", "g");
        let regexRules = new RegExp("[^a-zA-Z0-9.]", "g");
		// let regexNumbers = new RegExp("[0-9]", "g");

		let lines = input.split("\n");

let numbersPerLineStrings = lines.map((line) =>
    line.split(regexSymbols).filter((value) => value !== "")
);

// Done: I need all numbers
let allNumbers: InputNumber[] = [];
		// Done: getIndexOf Number number.length lastIndex of Number
		lines.forEach((line, indexOfLine) => {
			numbersPerLineStrings[indexOfLine].forEach((number) => {
				allNumbers.push(
					new InputNumber(indexOfLine, +number, line.indexOf(number))
				);
			});
		});

		// Done: forEach number.

		// Done: while let i = startIndex, while i <= indexEnd, i++{ check for lines-1, currentLine, lines+1}
		allNumbers.forEach((number) => {
			for (
				let i = number.indexStart === 0 ? 0 : number.indexStart - 1;
				i <= number.indexEnd + 1;
				i++
			) {
				let previousLine = number.line === 0 ? null : lines[number.line - 1];
				let currentLine = lines[number.line];
				let nextLine =
					number.line >= allNumbers.length - 1 ? null : lines[number.line + 1];
				// check previous Line
				if (previousLine !== null && previousLine !== undefined) {
					if (regexRules.test(previousLine.charAt(i))) {
						number.isValid = true;
					}
				}
				// Check current Line
				if (regexRules.test(currentLine.charAt(i))) {
					number.isValid = true;
				}
				// check next Line
				if (nextLine !== null && nextLine !== undefined) {
					if (regexRules.test(nextLine.charAt(i))) {
						number.isValid = true;
					}
				}
			}
		});
		let solution = 0;
		allNumbers
			.filter((number) => number.isValid)
			.forEach((number) => (solution += number.number));
		// console.log(allNumbers, allNumbers.length);
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
