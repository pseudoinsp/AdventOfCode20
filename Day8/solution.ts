import { readLines } from '../utils/inputReader';

const lines : string[] = readLines('Day8\\input.txt');


const evaluateInstructions = (instructions: string[]): [boolean, number] => {

    const visitedInstructions = new Set<number>();
    let currentInstructionIndex = 0;
    let accValue = 0;

    // eslint-disable-next-line no-constant-condition
    while(true) {
        const currentInstruction = instructions[currentInstructionIndex];

        if(visitedInstructions.has(currentInstructionIndex)) {
            return [false, accValue];
        }
        visitedInstructions.add(currentInstructionIndex);

        const instructionParts = currentInstruction.split(' ');
        const instructionName = instructionParts[0];
        const instructionValue = parseInt(instructionParts[1]);

        switch (instructionName) {
            case "nop":
                currentInstructionIndex++;                
                break;
            case  "acc":
                accValue += instructionValue;
                currentInstructionIndex++;
                break;
            case "jmp":
                if(instructionValue > 0) {
                    // no overflow will happen! but should seperate the nextIndex === length and other cases
                    // const nextIndex = (currentInstructionIndex + instructionValue) % instructions.length;
                    const nextIndex = (currentInstructionIndex + instructionValue);
                    currentInstructionIndex = nextIndex;
                }
                else if (instructionValue === 0) {
                    return [false, accValue];
                }
                else {
                    let nextIndex;
                    if(currentInstructionIndex + instructionValue >= 0)
                        nextIndex = currentInstructionIndex + instructionValue;
                    else
                        // this will not happen with this input
                        nextIndex = instructions.length - (Math.abs(instructionValue) - currentInstructionIndex - 1); 
                       
                    currentInstructionIndex = nextIndex;
                }
                break;
            default:
                break;
        }

        if(currentInstructionIndex === instructions.length) {
            return [true, accValue];
        } 
    }
};
const evaluation = evaluateInstructions(lines);
console.log(`Part 1 - Accumulator value before instruction repeat: ${evaluation[1]}`);

// part 2 naive solution - brute force
let currentModificationIndex = 0;

// eslint-disable-next-line no-constant-condition
while(true) {
    const lineCopy = lines.map(x => x);

    while(lineCopy[currentModificationIndex].split(' ')[0] === "acc") {
        currentModificationIndex++;
    }

    let instructionToModify = lineCopy[currentModificationIndex];
    if(instructionToModify.split(' ')[0] === "nop") 
        instructionToModify = instructionToModify.replace("nop", "jmp");
    else
        instructionToModify = instructionToModify.replace("jmp", "nop");  

    lineCopy[currentModificationIndex] = instructionToModify;

    const evaluation = evaluateInstructions(lineCopy);
    if(evaluation[0]) {
        console.log(`Part 2 - Accumulator value before exiting boot: ${evaluation[1]}`);
        break;
    }

    currentModificationIndex++;
}