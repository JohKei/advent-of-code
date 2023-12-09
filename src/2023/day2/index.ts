import { Day } from "../../day";

class Day2 extends Day {
	constructor() {
		super(2);
	}

	solveForPartOne(input: string): string {
		return solutionOne(input);
	}

	solveForPartTwo(input: string): string {
		return solutionTwo(input);
	}
}

export default new Day2();

const splitGames = (input: string) => {
	return input.split("\n");
};

const getGameIdNumber = (game: string) => {
	let gameId = game.slice(0, game.indexOf(":"));
	let splittedId = gameId.split("");
	let gameIdNumber = Number(
		splittedId.filter((character) => !isNaN(+character)).join("")
	);

	return gameIdNumber;
};

const getBagGrab = (game: string) => {
	return game.slice(game.indexOf(":") + 2).split(/; /g);
};

const getCubeNumber = (hand: string, color: "blue" | "red" | "green") => {
	let cubes = hand.split(", ");
    
	return (
		Number(
			cubes
				.find((cube) => cube.includes(`${color}`))
				?.split("")
				.filter((character) => !isNaN(+character))
				.join("")
		) ?? 0
	);
};

const solutionOne = (input: string) => {
	// n-cubes <= 12 red allowed
	// n-cubes <= 13 green allowed
	// n-cubes <= 14 blue allowed
	// get the Id of each possible game and sum the Id's

	let ruleRed = 12;
	let ruleGreen = 13;
	let ruleBlue = 14;

	let games = splitGames(input);
	let gameStatuses: GameStatus[] = [];
	let solution = 0;

	games.forEach((game) => {
		let gameIdNumber = getGameIdNumber(game);
		// console.log(gameIdNumber)

		let bagGrabs = getBagGrab(game);
		// console.log('bagGrabs',bagGrabs)

		let highestBlue = 0;
		let highestRed = 0;
		let highestGreen = 0;

		bagGrabs.forEach((hand) => {
			let blue = getCubeNumber(hand, "blue");
			let red = getCubeNumber(hand, "red");
			let green = getCubeNumber(hand, "green");

			if (blue > highestBlue) highestBlue = blue;
			if (red > highestRed) highestRed = red;
			if (green > highestGreen) highestGreen = green;
		});

		gameStatuses.push(
			new GameStatus(gameIdNumber, highestRed, highestGreen, highestBlue)
		);
	});
	// console.log(gameStatuses)
	let validGames = gameStatuses.filter((game) => {
		if (game.blue <= ruleBlue && game.red <= ruleRed && game.green <= ruleGreen)
			return game;
	});

	// console.log(validGames);

	validGames.forEach((game) => (solution += game.gameId));

	// console.log(games)
	return solution.toString();
};

const solutionTwo = (input: string) => {
	return "solutionTwo";
};

class GameStatus {
	gameId: number;
	red: number;
	green: number;
	blue: number;

	constructor(
		gameId: number,
		highestRed: number,
		higestGreen: number,
		highestBlue: number
	) {
		this.gameId = gameId;
		this.red = highestRed;
		this.green = higestGreen;
		this.blue = highestBlue;
	}
}
