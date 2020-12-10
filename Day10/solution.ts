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

// part 2

const variationsUntilNthAdapter = new Array<number>(numbers.length);
variationsUntilNthAdapter[0] = 1;
variationsUntilNthAdapter[1] = 1;
// the second adapter can be reached only from the first adapter, or from the first and the built-in adapter
variationsUntilNthAdapter[2] = numbers[2] - numbers[0] <= 3 ? 2 : 1;

for (let i = 3; i < numbers.length; i++) {
    // this adapter can be reached from all tree previous adapter
    if(numbers[i] - 3 === numbers[i-3])
        variationsUntilNthAdapter[i] = variationsUntilNthAdapter[i-3]+variationsUntilNthAdapter[i-2]+variationsUntilNthAdapter[i-1];
    // can be reached from the two previous numbers adapters
    else if (numbers[i] - 2 === numbers[i-2])
        variationsUntilNthAdapter[i] = variationsUntilNthAdapter[i-2]+variationsUntilNthAdapter[i-1];
    // or only from the previous adapter
    else
        variationsUntilNthAdapter[i] = variationsUntilNthAdapter[i-1];
}

console.log(`Part 2: Adapter variations: ${variationsUntilNthAdapter[variationsUntilNthAdapter.length-1]}`);