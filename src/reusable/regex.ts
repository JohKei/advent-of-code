export const symbols = new RegExp("\W", "g"); // Matches all Symbols except underScore
export const notNumbersNotDot = new RegExp("[^0-9.]", "g"); // Matches all except numbers & "."
export const notStar = new RegExp("[*]", "g"); // Matches all "*"
