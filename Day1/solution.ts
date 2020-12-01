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