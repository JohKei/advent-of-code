import { Day } from "../../day";

class Day5 extends Day {
	constructor() {
		super(5);
	}

	solveForPartOne(input: string): string {
		return solutionOne(input);
	}

	solveForPartTwo(input: string): string {
		return input;
	}
}

export default new Day5();

const solutionOne = (input: string) => {
	return "test";
};
