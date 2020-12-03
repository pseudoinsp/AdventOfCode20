import { readLines } from '../utils/inputReader';

const lines : string[] = readLines('Day3\\input.txt');
const lineLength = lines[0].length;

let currentPosition: number[] = [0, 0];
let treesOnLanding = 0;

for (let i = 0; i < lines.length; i++) {
    const yPos = currentPosition[1] % lineLength;
    const stateOnCoordinate = lines[i][yPos];
    
    treesOnLanding = treesOnLanding + (stateOnCoordinate == "#" ? 1: 0);

    currentPosition = [currentPosition[0] + 1, currentPosition[1] + 3];
}

console.log(`Part 1 - Trees on landing part: ${treesOnLanding}`);