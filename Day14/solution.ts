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

const replaceChar = (origString: string, replaceChar: string, index: number): string => {
    const firstPart = origString.substr(0, index);
    const lastPart = origString.substr(index + 1);
      
    const newString = firstPart + replaceChar + lastPart;
    return newString;
};

const getFloatingBitPermutations = (numberOfFloatingBits: number, current: string, result: Array<string>) => {
    if(current.length === numberOfFloatingBits) {
        result.push(current);
        return;
    }
    else {
        for(const dig of ["0", "1"]) {
            getFloatingBitPermutations(numberOfFloatingBits, current + dig, result);
        }
    }
};

const generateAddressVariationsFromFloatingAddress = (state: string): Array<number> => {
    const indexesOfX = new Array<number>();
    for (let i=0; i< state.length ;i++) 
        if (state[i]=="X") 
            indexesOfX.push(i);  

    const addresses = new Array<number>();
    const floatingBitPermutations = new Array<string>();
    getFloatingBitPermutations(indexesOfX.length, "", floatingBitPermutations);

    for(const permutation of floatingBitPermutations) {
        let address = state;
        for(let j = 0; j < indexesOfX.length; j++) {
            address = replaceChar(address, permutation[j], indexesOfX[j]);
        }
        addresses.push(parseInt(address, 2));
    }

    return addresses;
};

const calculateMemoryChanges = (mask: string, address: number, value: number) => {
    const addressAsString = address.toString(2);

    const result = new Array<string>();

    for (let i = mask.length - 1, j = addressAsString.length - 1; i >= 0; i--, j--) {
        const numberAtJ = addressAsString[j];
        let calc;
        if(mask[i] === "X")
            calc = "X";
        else
            calc = mask[i] === "1" ? "1" : numberAtJ || "0";
        result.push(calc);
    }

    const res = result.reverse().join('').toString();
    const memoryAddresses = generateAddressVariationsFromFloatingAddress(res);
    for(const address of memoryAddresses) 
        memory.set(address, value);
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
        calculateMemoryChanges(mask, memoryInstruction[0], memoryInstruction[1]);
    }
}

const sumValues = [...memory.values()].reduce((a, e) => a += e, 0);
console.log(`Part 1 - Sum of memory values: ${sumValues}`);