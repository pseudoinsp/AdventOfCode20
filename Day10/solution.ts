import { readLines } from '../utils/inputReader';

const numbers : number[] = readLines('Day10\\input.txt').map(x => parseInt(x));

numbers.push(0);

// part 1

const orderedNumbers = numbers.sort((a, b) => a - b);
orderedNumbers.push(orderedNumbers[orderedNumbers.length - 1] + 3);

let diffOf1 = 0;
let diffOf3 = 0;

for (let i = 0; i < orderedNumbers.length - 1; i++) {
    const diffToNext = orderedNumbers[i+1] - orderedNumbers[i];

    if(diffToNext === 1)
        diffOf1++;
    else if (diffToNext === 3)
        diffOf3++;
}

console.log(`Part 1 - Multiplied 1 and 3 diffs among the adapters: ${diffOf1 * diffOf3}`);