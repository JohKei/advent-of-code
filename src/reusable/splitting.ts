import { notNumbers, whiteSpace } from "./regex";

export const splitInput = (input: string): string[] => {
	return input.split("\n");
};

export const splitStringIntoNumbers = (input: string) => {
    return input.split(whiteSpace).filter((number) => number !== "").flatMap((number) => +number);
};