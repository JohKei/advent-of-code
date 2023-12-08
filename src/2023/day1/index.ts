import { Day } from "../../day";

class Day1 extends Day {
	constructor() {
		super(1);
	}

	solveForPartOne(input: string): string {
        return getSolution(input)
    }

	solveForPartTwo(input: string): string {
		return input;
	}
}

export default new Day1();


const getSolution = (input: string) => {
	const lines: string[] = input.split("\n");
	const lineNumbers: number[] = [];

	const getNumbers = (arg: string[]) => {
		let numbersInArray = arg.filter((character) => Number(!isNaN(+character)));
		const getRowNumber = () => {
			return numbersInArray[0] + numbersInArray[numbersInArray.length - 1];
		};
		const rowNumber = getRowNumber();
		lineNumbers.push(+rowNumber);
	};

	lines.forEach((row) => {
		const splittedRow = row.split("");
		getNumbers(splittedRow);
	});

	let solution = lineNumbers.reduce((a, b) => a + b);
	return solution.toString();
};
