import { readLines } from '../utils/inputReader';

const lines : string[] = readLines('Day3\\input.txt');
const lineLength = lines[0].length;

const traverseSlope = (xMotion: number, yMotion: number): number => {
    let currentPosition: number[] = [0, 0];
    let treesOnLanding = 0;

    while(currentPosition[0] < lines.length)
    {
        const yPos = currentPosition[1] % lineLength;
        const stateOnCoordinate = lines[currentPosition[0]][yPos];
        
        treesOnLanding += stateOnCoordinate == "#" ? 1 : 0;

        currentPosition = [currentPosition[0] + xMotion, currentPosition[1] + yMotion];
    }   

    return treesOnLanding;
};

console.log(`Part 1 - Trees on landing part: ${traverseSlope(1, 3)}`);

// Part 2
const slopeVariants = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]];

let multipliedTrees = 1;
slopeVariants.forEach(slope => {
    const treesMetInThisSlope = traverseSlope(slope[0], slope[1]);
    multipliedTrees *= treesMetInThisSlope;
});

console.log(`Part 2 - Multiplied trees on landing part: ${multipliedTrees}`);