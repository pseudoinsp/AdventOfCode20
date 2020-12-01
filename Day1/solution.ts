/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { readFileSync } from 'fs';

const readData: string = readFileSync('Day1\\input.txt', 'utf-8');
const lines : string[] = readData.split('\n');
const numbers: number[] = lines.map(x => parseInt(x));

const target = 2020;

// Part One - two sum
// O(n), O(n)

const complementers = new Set<number>();

numbers.forEach(number => {
    if(complementers.has(number))
    {
        console.log(`Part 1 solution: ${number * (target - number)}`);    
    }

    complementers.add(target - number);
});

// Part two - three sum
// O(n^2), O(n)

interface SumPair {
    firstPart: number,
    secondPart: number
}

const threeSumComplementers = new Map<number, SumPair>();

for (let i = 0; i < numbers.length; i++) {
    for (let j = i+1; j < numbers.length; j++) {
        const twoSumPart : number = numbers[i] + numbers[j];
        threeSumComplementers.set(target - twoSumPart, { firstPart: numbers[i], secondPart: numbers[j] });
    }
}

numbers.forEach(number => {
    if(threeSumComplementers.has(number)) {
        const others : SumPair | undefined = threeSumComplementers.get(number);
        if(others) {
            console.log(`Part 2 solution: ${number * others.firstPart * others.secondPart}`);    
            return;
        }
    }
});
