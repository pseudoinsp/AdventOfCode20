import { readLines } from '../utils/inputReader';

const lines : string[] = readLines('Day5\\input.txt');

const processInstructions = (instructions: string): number => {
    let lowerBound = 0;
    let upperBound = Math.pow(2, instructions.length) - 1;

    for (let i = 0; i < instructions.length; i++)  {
        const instruction = instructions[i];

        if(instruction === "F" || instruction === "L")
            upperBound = Math.floor(upperBound - (upperBound -lowerBound) / 2);
        else
            lowerBound = Math.floor(lowerBound + (upperBound + 1 - lowerBound) / 2);
    }

    return lowerBound;
};

let maxSeatValue = -1;
const collectedSeatValues = new Array<number>();

for(const instructions of lines) {
    const rowInstructions = instructions.substring(0, instructions.length - 3);
    const seatInstrunctions = instructions.substring(instructions.length - 3, instructions.length);

    const rowNumber = processInstructions(rowInstructions);
    const seatNumber = processInstructions(seatInstrunctions);

    const seatValue = rowNumber*8 + seatNumber;
    collectedSeatValues.push(seatValue);
    maxSeatValue = Math.max(maxSeatValue, seatValue);
}

console.log(`Part 1 - Max seat value: ${maxSeatValue}`);

// part2
const orderedSeatValues = collectedSeatValues.sort((a, b) => a - b);
for (let i = 0; i < orderedSeatValues.length - 1; i++) {
    if (orderedSeatValues[i] + 1 !== orderedSeatValues[i + 1]) {
        console.log(`Part 2 - Missing seat value: ${orderedSeatValues[i] + 1}`);
    }
}