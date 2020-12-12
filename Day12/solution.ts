import { exception } from 'console';
import { readLines } from '../utils/inputReader';

const instructions : string[] = readLines('Day12\\input.txt');

const currentPosition = [0, 0];
let waypointPositionFromShip = [10, 1];

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

const GetWaypointPosition = (currentPosition: number[], rotateTo: string, rotationValue: number): number[] => {
        // use matrix rotation next time...
        let rotationValueFinal = rotationValue % 360;
        if(rotateTo === "L")
            rotationValueFinal = 360 - rotationValueFinal;

        switch (rotationValueFinal) {
            case 90:
                return [currentPosition[1], -1*currentPosition[0]];
            case 180:
                return [-1*currentPosition[0], -1*currentPosition[1]];
            case 270:
                return [-1*currentPosition[1], currentPosition[0]];
            default:
                throw exception;
        }
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
            waypointPositionFromShip[0] += change[0];
            waypointPositionFromShip[1] += change[1];
            break;
        case "L":
        case "R":
            const newPosition = GetWaypointPosition(waypointPositionFromShip, instrName, instrValue);
            waypointPositionFromShip = newPosition;
            break;
        case "F":
            currentPosition[0] += instrValue * waypointPositionFromShip[0];
            currentPosition[1] += instrValue * waypointPositionFromShip[1];
            break;
        default:
            break;
    }
}

console.log(`Part 2 - Movement from starting position: ${Math.abs(currentPosition[0]) + Math.abs(currentPosition[1])}`);