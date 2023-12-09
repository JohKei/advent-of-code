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
    // Information: n <= 12 red allowed
    // Information: n <= 13 green allowed
    // Information: n <= 14 blue allowed
    // Information: get the Id of each possible game and sum the Id's 

    let ruleRed = 12
    let ruleGreen = 13
    let ruleBlue = 14

    let games = input.split('\n')
    let gameStatuses: GameStatus[] = [];   
    let solution = 0;

    games.forEach((game) => {
        // Done: getGameNumber
        let gameId = game.slice(0, game.indexOf(':'))
        let splittedId = gameId.split('')
        let gameIdNumber = Number(splittedId.filter((character) => !isNaN(+character)).join(""))
        // console.log(gameIdNumber)

        // Done: split bagGrabs in each Game
        let bagGrabs = game.slice(game.indexOf(':')+2).split(/; /g)
        // console.log('bagGrabs',bagGrabs)
        
        let highestBlue = 0
        let highestRed = 0
        let highestGreen = 0

        bagGrabs.forEach((hand) => {
            let cubes = hand.split(', ')
            let blue = Number(
							cubes
								.find((cube) => cube.includes("blue"))
								?.split("")
								.filter((character) => !isNaN(+character))
								.join("")
						) ?? 0;
            let red = Number(
							cubes
								.find((cube) => cube.includes("red"))
								?.split("")
								.filter((character) => !isNaN(+character))
								.join("")
						) ?? 0;
            let green = Number(
							cubes
								.find((cube) => cube.includes("blue"))
								?.split("")
								.filter((character) => !isNaN(+character))
								.join("")
						) ?? 0;
            if (blue > highestBlue) highestBlue = blue
            if (red > highestRed) highestRed = red
            if (green > highestGreen) highestGreen = green
        })

        gameStatuses.push(new GameStatus(gameIdNumber, highestRed, highestGreen, highestBlue))

    })
    // console.log(gameStatuses)
    let validGames = gameStatuses.filter((game) => {
        if (game.blue <= ruleBlue && game.red <= ruleRed && game.green <= ruleGreen) return game
    })


    console.log(validGames)

    validGames.forEach((game) => solution += game.gameId)

    // console.log(games)
    return solution.toString()
}

class GameStatus {
    gameId: number
    red: number
    green: number
    blue: number

    constructor(gameId: number, highestRed: number, higestGreen: number, highestBlue: number){
        this.gameId = gameId
        this.red = highestRed
        this.green = higestGreen
        this.blue = highestBlue
    }
}
