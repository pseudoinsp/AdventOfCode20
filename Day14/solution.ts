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

// const calculateNewMemoryValue = (mask: string, value: number): number => {
//     const valueAsString = value.toString(2);

//     const result = new Array<number>();

//     for (let i = mask.length - 1, j = valueAsString.length - 1; i >= 0; i--, j--) {
//         const numberAtI = parseInt(valueAsString[j]);
//         const calc = mask[i] !== "X" ? parseInt(mask[i]) : numberAtI || 0;    
//         result.push(calc);
//     }

//     const res = result.reverse().join('').toString();
//     const resNum = parseInt(res, 2);
//     return resNum;
// };

const replaceChar = (origString: string, replaceChar: string, index: number): string => {
    let firstPart = origString.substr(0, index);
    let lastPart = origString.substr(index + 1);
      
    let newString = firstPart + replaceChar + lastPart;
    return newString;
}

const reduceVariation = (index: number, variation: string, allVariations : Array<number>) => {
    const nullVariant = replaceChar(variation, "0", index);
    const oneVariant = replaceChar(variation, "1", index);

    

    allVariations.push(variation[index] = 0
}

const generateAddressVariationsFromFloatingAddress = (state: string): Array<number> => {
    const indexesOfX = new Array<number>();
    for (let i=0; i< state.length ;i++) 
        if (state[i]=="X") 
            indexesOfX.push(i);  

    const addresses = new Array<number>();

    for(const indexofX of indexesOfX) {

    }

    console.log(indexesOfX);
    return addresses;
};

const calculateMemoryChanges = (mask: string, address: number, value: number): Array<number> => {
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
    for(const address of memoryAddresses) {
        memory.set(address, value);
    }
    // const resNum = parseInt(res, 2);
    return new Array<number>(value);
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
        const newMemoryValue = calculateMemoryChanges(mask, memoryInstruction[0], memoryInstruction[1]);
        console.log(newMemoryValue);
        // memory.set(memoryInstruction[0], newMemoryValue);
    }
}

const values = Array.from(memory.values());
const sumValues = values.reduce((a, e) => a += e, 0);
console.log(`Part 1 - Sum of memory values: ${sumValues}`);