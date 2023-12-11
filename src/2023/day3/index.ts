import { link } from "fs";
import { Day } from "../../day";

class Day3 extends Day {
	constructor() {
		super(3);
	}
	solveForPartOne(input: string): string {
		solutionOne(input.split('\n'))
		return 'test'
	}

	solveForPartTwo(input: string): string {
		return input;
	}
}

export default new Day3();

const regexRules = new RegExp('[^0-9.]')
const regexNumbers = new RegExp('[^0-9]')

const solutionOne = (input: string[]) => {
	const x = input[0].length 
	const y = input.length 
	let numbers

	for (let row = 0; row < x ; row++){
		for (let column = 0; column < y; column++){

			let currentCharacter = input[row][column]
			let number 

			if (!isNaN(+currentCharacter)){
				console.log(currentCharacter)

				
			}



		}
	}
}
