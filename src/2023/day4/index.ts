import { Day } from "../../day";
import { notNumbers, numbers, symbols, whiteSpace } from "../../reusable/regex";
import { splitInput, splitStringIntoNumbers, test } from "../../reusable/splitting";

class Day4 extends Day {
	constructor() {
		super(4);
	}

	solveForPartOne(input: string): string {
		return getSolutionOne(input);
	}

	solveForPartTwo(input: string): string {
		return getSolutionTwo(input);
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
	let duplicatedCards: Array<string[]> = [];
	lines.forEach((card) => {
		if (!duplicatedCards.includes(card)) {
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
			duplicatedCards.push(card);
		}
	});
	return solution.toString();
};

type Card = { [key: string]: number };

const getSolutionTwo = (input: string) => {
    let cards :Card= {}
    let lines = splitInput(input).map((line) => line.split(/[:|]/g).map((section) => test(section)));
    lines.forEach((scratchCard) => {
        cards[scratchCard[0][0]] = 1
    })

    lines.forEach((scratchCard) => {
        let currentCard = scratchCard[0][0]
        let nextCard = scratchCard[0][0] + 1;
		let matches = 0;
		let winningNumbers = scratchCard[1];
		let myNumbers = scratchCard[2];
		myNumbers.forEach((number) => {
			if (winningNumbers.includes(number)) {
				matches++;
			}
		});
		for (let i = 0; i < matches; i++) {
			cards[nextCard] += (1 * cards[currentCard])
			nextCard++;
		}
    })
    let solution = 0
    for (const [key, value] of Object.entries(cards)){
        solution += cards[key]
    }

    
	return solution.toString();
};
