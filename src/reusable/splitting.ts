import { notNumbers, whiteSpace } from "./regex";

export const splitInput = (input: string): string[] => {
	return input.split("\n");
};

export const splitStringIntoNumbers = (input: string) => {
    
    return input.split(whiteSpace).filter((number) => {
        if (number !== "" && !isNaN(+number)){
            return number
        }
    }).flatMap((number) => +number );
};

export const test = (input: string) => {
    return input
		.replace(/\D/g, " ")
		.split(whiteSpace)
		.filter((number) => {
			if (number !== "" && !isNaN(+number)) {
				return number;
			}
		})
		.flatMap((number) => +number);
}