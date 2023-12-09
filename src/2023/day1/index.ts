import { Day } from "../../day";

class Day1 extends Day {
	constructor() {
		super(1);
	}

	solveForPartOne(input: string): string {
        return getSolution(input)
    }

	solveForPartTwo(input: string): string {
		return getSolution(input);
	}
}

export default new Day1();

const writtenNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']


const getSolution = (input: string) => {

	const lines: string[] = input.split("\n");
	const lineNumbers: number[] = [];


	const getNumbers = (splittedRow: string[], fullRow: string) => {
        // Information: for part 2 I need: 
        // Information: indexOf, lastIndexOf, slice

        let words :number[]= []

        
        writtenNumbers.forEach((number:string) => {
            let firstIndex = 0 
            firstIndex = fullRow.indexOf(number)
            let lastIndex = 0 
            lastIndex = fullRow.lastIndexOf(number)
            
            let word = fullRow.slice(firstIndex, lastIndex)
            if(word) console.log(word, 'word...')
            if (writtenNumbers.includes(word)){
                words.push(firstIndex, lastIndex)
                console.log(words)
            }
        })
        // if (words.length){
        //     console.log(words, fullRow)
        // }


		let numbersInArray = splittedRow.filter((character) => Number(!isNaN(+character)));
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
