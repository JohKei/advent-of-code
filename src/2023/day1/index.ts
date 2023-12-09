import { Day } from "../../day";

class Day1 extends Day {
	constructor() {
		super(1);
	}

	solveForPartOne(input: string): string {
		return getSolutionOne(input);
	}

	solveForPartTwo(input: string): string {
		return getSolutionTwo(input);
	}
}

export default new Day1();

const getSolutionOne = (input: string) => {
	const lines: string[] = input.split("\n");
	const lineNumbers: number[] = [];

	const getNumbers = (splittedRow: string[], fullRow: string) => {
		let words: number[] = [];

		let numbersInArray = splittedRow.filter((character) =>
			Number(!isNaN(+character))
		);
		const getRowNumber = () => {
			return numbersInArray[0] + numbersInArray[numbersInArray.length - 1];
		};
		const rowNumber = getRowNumber();
		lineNumbers.push(+rowNumber);
	};

	lines.forEach((row) => {
		const splittedRow = row.split("");
		getNumbers(splittedRow, row);
	});

	let solution = lineNumbers.reduce((a, b) => a + b);
	return solution.toString();
};

const writtenNumbers = [
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
];

const getSolutionTwo = (input: string) => {
	// Todo: Day1 part2
	return "hello";
};

