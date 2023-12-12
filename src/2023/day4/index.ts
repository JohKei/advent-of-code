import { Day } from "../../day";
import { splitInput } from "../../reusable/splitting";

class Day4 extends Day {
	constructor() {
		super(4);
	}

	solveForPartOne(input: string): string {
		return getSolutionOne(input);
	}

	solveForPartTwo(input: string): string {
		return input;
	}
}

export default new Day4();

const getSolutionOne = (input: string) => {
	let lines = splitInput(input)

	return "test";
};
