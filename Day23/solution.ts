import { readInput } from '../utils/inputReader';

const data : string = readInput('Day23\\input.txt');

const cups = data.split('').map(x => parseInt(x));

const rotateArray = (array: number[], count: number): number[] => {
    return [...array.slice(count, array.length), ...array.slice(0, count)];
};

let round = 1;
const simulateMove = (cups: number[], currentCupIndex: number): [number[], number] => {
    console.log(`Round ${round++}: cups: ${cups.toString()},current cup: ${cups[currentCupIndex]}`);
    if(currentCupIndex >= cups.length - 3) {
        cups = rotateArray(cups, 3);
        currentCupIndex -= 3;
    }
    const currentCup = cups[currentCupIndex];
    const removedCups = cups.splice(currentCupIndex + 1, 3);
    console.log(`pick up: ${removedCups.toString()}`);
    const remainingCups = cups;
    let destinationCupIndex = -1;

    const cupsAndIndexes = remainingCups.map((x, i) => [x, i]);
    cupsAndIndexes.sort((x, y) => x[0] - y[0]);
    const indexOfCurrentCupSorted = cupsAndIndexes.findIndex(x => x[0] === currentCup);
    if(indexOfCurrentCupSorted === 0) {
        destinationCupIndex = cupsAndIndexes[cupsAndIndexes.length - 1][1];
    }
    else {
        destinationCupIndex = cupsAndIndexes[indexOfCurrentCupSorted-1][1];
    }
    

    remainingCups.splice(destinationCupIndex + 1, 0, ...removedCups);
    let newCurrentCupIndex = remainingCups.findIndex(x =>x === currentCup) + 1;
    if(newCurrentCupIndex === remainingCups.length)
        newCurrentCupIndex = 0;

    console.log(`destination: ${remainingCups[destinationCupIndex]}`);

    return [remainingCups, newCurrentCupIndex];
};

let cupState = cups;
let currentCup = 0;

for(let i = 0; i < 100; i++)  {
    const [ newCupState, newCurrentCup ] = simulateMove(cupState, currentCup);
    cupState = newCupState;
    currentCup = newCurrentCup;
}

// Part 1
const indexOf1 = cupState.indexOf(1);
const firstPart = cupState.slice(indexOf1 + 1);
const secondPart = cupState.slice(0, indexOf1);
const numbersInOrder = firstPart.concat(secondPart);

console.log(`Part 1 - Order of numbers, right from 1: ${numbersInOrder.join('')}`);