import { readLines } from '../utils/inputReader';

const numbers : number[] = readLines('Day9\\input.txt').map(x => parseInt(x));

const preambleSize = 25;

// Part 1 naive solution
const checkPreample = (checkedIndex: number): boolean => {
    for (let i = checkedIndex - preambleSize; i < checkedIndex; i++) {
        for (let j = i + 1; j < checkedIndex; j++) {
            if(numbers[i] + numbers[j] === numbers[checkedIndex])
                return true;
        }
    }

    return false;
};

let wrongNumber = -1;

for (let i = preambleSize; i < numbers.length; i++) {
    if(!checkPreample(i)) {
        console.log(`Part 1 - first wrong number: ${i}: ${numbers[i]}`);
        wrongNumber = numbers[i];
        break;
    }
}

// part 2
outerloop: for (let i = 0; i < numbers.length; i++) {
    let currentSum = numbers[i];

    for (let j = i + 1; j < numbers.length; j++) {
        currentSum += numbers[j];

        if(currentSum === wrongNumber) {
            const subArray = numbers.slice(i, j);
            const maxOfSubArray = subArray.reduce((a, e) => a = e > a ? e : a, numbers[i]);
            const minOfSubArray = subArray.reduce((a, e) => a = e < a ? e : a, numbers[i]);
            console.log(`Part 2 - Sum of min and max in array: ${maxOfSubArray + minOfSubArray}`);
            break;
        }
        else if(currentSum > wrongNumber) {
            continue outerloop;
        }
    }
}

// Part 1 more effective solution init
// const sumsAndFrequencies = new Map<number, number>();
// const numbersAndComposedSums = new Array<[number, Array<number>]>();

// for (let i = 0; i < preambleSize; i++) {
//     const allSumsWithNumber = new Array<number>();

//     for (let j = i+1; j < preambleSize; j++) {
//         const sum = numbers[i] + numbers[j];
//         allSumsWithNumber.push(sum);

//         // TODO should update j's sum array as well
//         const sums = sumsAndFrequencies.get(sum);
//         if(sums)
//             sumsAndFrequencies.set(sum, sums + 1);
//         else
//             sumsAndFrequencies.set(sum, 1);
//     }

//     numbersAndComposedSums.push([i, allSumsWithNumber]);
// }

// console.log(numbersAndComposedSums.length);
// console.log(sumsAndFrequencies.size);