import { readLines } from '../utils/inputReader';

const data : string[] = readLines('Day13\\input.txt');

const timestamp = parseInt(data[0]);
const activeBuses = data[1].split(',').filter(x => x !== "x").map(x => parseInt(x));

const getNextDepartTimeFromTimestamp = (frequency: number, timestamp: number): number => {
    const prev = Math.floor(timestamp / frequency);
    const timestampUntilPrev = prev * frequency;

    if(timestampUntilPrev === timestamp)
        return timestamp;
    else 
        return timestampUntilPrev + frequency;
};

let earliestDepartTime = [activeBuses[0], Number.MAX_SAFE_INTEGER];
for(const bus of activeBuses) {
    const nextDepartTime = getNextDepartTimeFromTimestamp(bus, timestamp);
    if(nextDepartTime < earliestDepartTime[1])
        earliestDepartTime = [bus, nextDepartTime];
}

console.log(`Part 1 - bus id * waiting time: ${earliestDepartTime[0] * (earliestDepartTime[1] - timestamp)}`);