import { readLines } from '../utils/inputReader';

const data : string[] = readLines('Day14\\input.txt');

const retrieveMemoryInstruction = (line: string): [index: number, value: number] => {
    const parts = line.split('=');
    const startI = parts[0].indexOf('[');
    const endI = parts[0].indexOf(']');
    const index = parseInt(parts[0].substring(startI+1, endI));
    const value = parseInt(parts[1].trim());

    return [index, value];
};

const retrieveMaskValue = (line: string): string => {
    return line.split('=')[1].substring(1);
};

const calculateNewMemoryValue = (mask: string, value: number): number => {
    const valueAsString = value.toString(2);

    const result = new Array<number>();

    for (let i = mask.length - 1, j = valueAsString.length - 1; i >= 0; i--, j--) {
        const numberAtI = parseInt(valueAsString[j]);
        const calc = mask[i] !== "X" ? parseInt(mask[i]) : numberAtI || 0;    
        result.push(calc);
    }

    const res = result.reverse().join('').toString();
    const resNum = parseInt(res, 2);
    return resNum;
};

let mask = "";
const memory = new Map<number, number>();

for (let i = 0; i < data.length; i++) {
    if(data[i].startsWith("mask")) {
        const newMask = retrieveMaskValue(data[i]);
        mask = newMask;
    }
    else {
        const memoryInstruction = retrieveMemoryInstruction(data[i]);
        const newMemoryValue = calculateNewMemoryValue(mask, memoryInstruction[1]);
        memory.set(memoryInstruction[0], newMemoryValue);
    }
}

const values = Array.from(memory.values());
const sumValues = values.reduce((a, e) => a += e, 0);
console.log(`Part 1 - Sum of memory values: ${sumValues}`);