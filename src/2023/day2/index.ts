import { Day } from "../../day";

class Day2 extends Day {

    constructor(){
        super(2);
    }

    solveForPartOne(input: string): string {
        return solutionOne(input);
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day2;

const solutionOne = (input: string) => {
    return 'solution One'
}