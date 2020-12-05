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
for(const instructions of lines) {
    const rowInstructions = instructions.substring(0, instructions.length - 3);
    const seatInstrunctions = instructions.substring(instructions.length - 3, instructions.length);

    const rowNumber = processInstructions(rowInstructions);
    const seatNumber = processInstructions(seatInstrunctions);

    const seatValue = rowNumber*8 + seatNumber;
    maxSeatValue = maxSeatValue > seatValue ? maxSeatValue : seatValue;
}

console.log(`Part 1 - Max seat value: ${maxSeatValue}`);