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
let maxRow = -1;
let minRow = 9999;
const collectedSeatValues = new Set<number>();

for(const instructions of lines) {
    const rowInstructions = instructions.substring(0, instructions.length - 3);
    const seatInstrunctions = instructions.substring(instructions.length - 3, instructions.length);

    const rowNumber = processInstructions(rowInstructions);
    const seatNumber = processInstructions(seatInstrunctions);

    maxRow = Math.max(maxRow, rowNumber);
    minRow = Math.min(minRow, rowNumber);

    const seatValue = rowNumber*8 + seatNumber;
    collectedSeatValues.add(seatValue);
    maxSeatValue = Math.max(maxSeatValue, seatValue);
}

console.log(`Part 1 - Max seat value: ${maxSeatValue}`);

// part2
for (let i = minRow; i <= maxRow; i++) {
    for (let j = 0; j <= 7; j++) {
        const seatValue = i*8 + j;
        if(!collectedSeatValues.has(seatValue))
            console.log(`Part 2 - seat candidate: row ${i} seat ${j} value ${seatValue}`);
    }
}