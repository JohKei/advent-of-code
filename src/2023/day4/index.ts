import { Day } from "../../day";
import { splitInput, splitStringIntoNumbers} from "../../reusable/splitting";

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
		.map((line) => line.split(": "))
		.map((line) => line.splice(line.indexOf("Card"), 1))
		.join(",")
		.split(",")
		.map((line) => line.split("|"));

	let solution = 0;
    let duplicatedCards :Array<string[]> = []
	lines.forEach((card) => {
        if (!duplicatedCards.includes(card)){    
            let cardPoints = 0;
			let winningNumbers = splitStringIntoNumbers(card[0]);
			let myNumbers = splitStringIntoNumbers(card[1]);
			myNumbers.forEach((number) => {
				if (winningNumbers.includes(number)) {
					if (cardPoints === 0) {
						cardPoints = 1;
					} else {
						cardPoints *= 2;
					}
				}
			});
			solution += cardPoints;
            duplicatedCards.push(card)
        }
	});
	return solution.toString();
};
