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

const getSolutionTwo = (input: string) => {

	let lines = input.replace(/one/gi, 'oonee')
	lines = lines.replace(/two/gi, "ttwoo")
	lines = lines.replace(/three/gi, 'tthreee')
	lines = lines.replace(/four/gi, "ffourr")
	lines = lines.replace(/five/gi, 'ffivee')
	lines = lines.replace(/six/gi, 'ssixx')
	lines = lines.replace(/seven/gi, 'ssevenn')
	lines = lines.replace(/eight/gi, 'eeightt')
	lines = lines.replace(/nine/gi, 'nninee')

	lines = lines.replace(/one/gi, "1");
	lines = lines.replace(/two/gi, "2");
	lines = lines.replace(/three/gi, "3");
	lines = lines.replace(/four/gi, "4");
	lines = lines.replace(/five/gi, "5");
	lines = lines.replace(/six/gi, "6");
	lines = lines.replace(/seven/gi, "7");
	lines = lines.replace(/eight/gi, "8");
	lines = lines.replace(/nine/gi, "9");

	return getSolutionOne(lines);
};
