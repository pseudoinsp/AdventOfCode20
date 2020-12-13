import { readLines } from '../utils/inputReader';

const data : string[] = readLines('Day13\\input.txt');

const activeBuses = data[1].split(',').map((x, i) => [i, parseInt(x)]).filter(x => x[1]);

const checkTimestampOnFrequency = (frequency: number, timestamp: number): boolean => {
    return timestamp % frequency === 0;
};

const busesByRarity = activeBuses.sort((x, y) => y[1] - x[1]);
console.log(busesByRarity);

let combinationFound = false;

// during result observations, see that 6 is the most match, and these rounds are in equal distance from each other
// the starting point is the number of the first round with 6 matches after the 100000000000000 from the description
// one round is the check of all buses, starting from the least frequent one
// so 100000000000000 / (biggest bus) + increase until the first 6 match round
let round = 101022992671;
outer: while(!combinationFound) {
    const timestampOrigo = busesByRarity[0][1]*round;
    let matchesThisTry = 0;
    for(const bus of busesByRarity) {
        if(!checkTimestampOnFrequency(bus[1], timestampOrigo - (busesByRarity[0][0] - bus[0]))) {
            // this is the distance of rounds with 6 matches
            round += 454315711;
            if(matchesThisTry > 4)
                console.log(`${timestampOrigo}: ${matchesThisTry}`);
            continue outer;
        }
        else
            matchesThisTry++;
    }

    combinationFound = true;
}

console.log(`Part 2 - Timestamp of all buses matching: ${round * busesByRarity[0][1] - busesByRarity[0][0]}`);

// part A
// const timestamp = parseInt(data[0]);

// const getNextDepartTimeFromTimestamp = (frequency: number, timestamp: number): bool => {
//     const prev = Math.floor(timestamp / frequency);
//     const timestampUntilPrev = prev * frequency;

//     if(timestampUntilPrev === timestamp)
//         return timestamp;
//     else 
//         return timestampUntilPrev + frequency;
// };

// let earliestDepartTime = [activeBuses[0], Number.MAX_SAFE_INTEGER];
// for(const bus of activeBuses) {
//     const nextDepartTime = getNextDepartTimeFromTimestamp(bus, timestamp);
//     if(nextDepartTime < earliestDepartTime[1])
//         earliestDepartTime = [bus, nextDepartTime];
// }

// console.log(`Part 1 - bus id * waiting time: ${earliestDepartTime[0] * (earliestDepartTime[1] - timestamp)}`);