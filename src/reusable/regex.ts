
export const symbols = new RegExp("\W", "g"); // Matches all Symbols except underScore
export const notNumbersNotDot = new RegExp("[^0-9.]", "g"); // Matches all except numbers & "."
export const notStar = new RegExp("[*]", "g"); // Matches all "*"
export const numbers = new RegExp('\d', 'g') // Matches Numbers
export const notNumbers = new RegExp("[_^\D]", "g");
export const whiteSpace = new RegExp(/\s+/); // Matches all Whitespaces