import { exception } from 'console';
import { readLines } from '../utils/inputReader';

const instructions : string[] = readLines('Day12\\input.txt');

const currentPosition = [0, 0];
let currentDirection = "E";

const GetChange = (quarter: string, value: number): number[] => {
    switch (quarter) {
        case "N":
            return [0, value];
        case "S":
            return [0, -value];
        case "E":
            return [value, 0];
        case "W":
            return [-value, 0];
        default:
            throw exception;
    }
};

const directionMapping = new Map<string, number>();
directionMapping.set("N", 0);
directionMapping.set("E", 90);
directionMapping.set("S", 180);
directionMapping.set("W", 270);

const GetNewDirection = (currentDirection: string, rotateTo: string, rotationValue: number): string => {
    const rotationValueFinal = rotationValue % 360;

    const current = directionMapping.get(currentDirection) || 0;
    const newCurrent = rotateTo ===  "L" ? current - rotationValueFinal : current + rotationValueFinal;

    let newCurrentFinal = newCurrent % 360;
    if(newCurrentFinal < 0)
        newCurrentFinal = Math.abs(-360 - newCurrentFinal);
    const newDirection = [...directionMapping].filter(x => x[1] === newCurrentFinal)[0][0];
    return newDirection;
};

for(const instr of instructions) {
    const instrName = instr[0];
    const instrValue = parseInt(instr.substring(1)); 

    switch (instrName) {
        case "N":
        case "S":
        case "E":
        case "W":
            const change = GetChange(instrName, instrValue);
            currentPosition[0] += change[0];
            currentPosition[1] += change[1];
            break;
        case "L":
        case "R":
            currentDirection = GetNewDirection(currentDirection, instrName, instrValue);
            break;
        case "F":
            const change2 = GetChange(currentDirection, instrValue);
            currentPosition[0] += change2[0];
            currentPosition[1] += change2[1];
            break;
        default:
            break;
    }
}

console.log(`Part 1 - Movement from starting position: ${Math.abs(currentPosition[0]) + Math.abs(currentPosition[1])}`);