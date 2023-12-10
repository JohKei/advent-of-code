import { Day } from "../../day";

class Day3 extends Day {
	constructor() {
		super(3);
	}

	solveForPartOne(input: string): string {
		// Information: valid numbers n-1 , n , n+1

		let regexSymbols = new RegExp("(\\*|\\+|\\$|\\#)", "g");
		let regexNumbers = new RegExp("[0-9]", "g");

		let lines = input.split("\n");
		let splittedInput = lines.map((line) => line.split(""));

		// Done: I need all numbers
		let allNumbers: InputNumber[] = [];
		// Done: getIndexOf Number number.length lastIndex of Number
		lines.forEach((line, indexOfLine) => {
			let numbers = line.split(".").filter((number) => number.length);
			numbers.forEach((number) => {

                let realNumber = number.split("").filter((character) => !isNaN(+character)).join("")
                // console.log(number.split("").filter((character) => !isNaN(+character)).join(""))

                // console.log('realNumber', Number(realNumber))
                console.log('valid number', typeof(realNumber), realNumber)
				if (!isNaN(+number)) {
					allNumbers.push(
						new InputNumber(indexOfLine, +number, line.indexOf(number))
					);
				}
			});
		});
		// Done: forEach number.

		// Done: while let i = startIndex, while i <= indexEnd, i++{ check for lines-1, currentLine, lines+1}
		allNumbers.forEach((number) => {
			let isValidNumber = true;
			for (
				let i = number.indexStart === 0 ? 0 : number.indexStart - 1;
				i <= number.indexEnd + 1;
				i++
			) {
				let previousLine = number.line === 0 ? null : number.line - 1;
				let currentLine = number.line;
				let nextLine =
					number.line === allNumbers.length ? null : number.line + 1;

				// Done: check previous Line
				if (previousLine) {
					if (regexSymbols.test(lines[previousLine].charAt(i)))
						number.isValid = true;
				}
				// Done: Check current Line
				if (regexSymbols.test(lines[currentLine].charAt(i)))
					number.isValid = true;
				// Done: check next Line
				if (nextLine) {
					if (regexSymbols.test(lines[nextLine].charAt(i)))
						number.isValid = true;
				}
			}
		});
		// console.log(allNumbers);

		// console.log(lines, allNumbers);


        let solution = 0
        allNumbers.filter((number) => number.isValid).forEach((number) => solution += number.number)
        // console.log(allNumbers)
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
