import { readInput } from '../utils/inputReader';

const data : string = readInput('Day15\\input.txt');

const startingNumbers = data.split(',').map(x => parseInt(x));

const spokenNumbersAndTurns = new Map<number, [number, number]>();

for(const [i, number] of startingNumbers.entries()) {
    spokenNumbersAndTurns.set(number, [0, i+1]);
}

let lastSpoken = startingNumbers[startingNumbers.length-1];

for (let i = startingNumbers.length; i < 2020; i++) {
    
    const turnNumber = i+1;
    const twoPrevSpoke = spokenNumbersAndTurns.get(lastSpoken);
    let numberThisTurn: number;
    if(!twoPrevSpoke) {
        numberThisTurn = 0;
    }
    else {
        if(twoPrevSpoke[0] === 0) {
            numberThisTurn = 0;
        }
        else 
            numberThisTurn = twoPrevSpoke[1] - twoPrevSpoke[0];
    }

    const thisNumberPrevioulsSpoken = spokenNumbersAndTurns.get(numberThisTurn);
    if(thisNumberPrevioulsSpoken) {
        spokenNumbersAndTurns.set(numberThisTurn, [thisNumberPrevioulsSpoken[1], turnNumber]);
    }
    else {
        spokenNumbersAndTurns.set(numberThisTurn, [0, turnNumber]);
    }
    
    lastSpoken = numberThisTurn;
}

console.log(lastSpoken);