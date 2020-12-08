import { readLines } from '../utils/inputReader';

const lines : string[] = readLines('Day8\\input.txt');

let accValue = 0;
const visitedInstructions = new Set<number>();
let currentInstructionIndex = 0;

// eslint-disable-next-line no-constant-condition
while(true) {
    const currentInstruction = lines[currentInstructionIndex];

    if(visitedInstructions.has(currentInstructionIndex)) {
        break;
    }
    visitedInstructions.add(currentInstructionIndex);

    const instructionParts = currentInstruction.split(' ');
    const instructionName = instructionParts[0];
    const instructionValue = parseInt(instructionParts[1]);

    switch (instructionName) {
        case "nop":
            currentInstructionIndex = currentInstructionIndex === lines.length - 1 ? 0 : currentInstructionIndex + 1;
            break;
        case  "acc":
            accValue += instructionValue;
            currentInstructionIndex = currentInstructionIndex === lines.length - 1 ? 0 : currentInstructionIndex + 1;
            break;
        case "jmp":
            currentInstructionIndex = (currentInstructionIndex + instructionValue) % lines.length;
            break;
        default:
            break;
    }
}

console.log(`Part 1 - Accumulator value before instruction repeat: ${accValue}`);

