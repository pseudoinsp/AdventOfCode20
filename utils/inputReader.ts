import { readFileSync } from 'fs';

export const readLines = (fileLocation: string): string[] => {
    const readData: string = readFileSync(fileLocation, 'utf-8');
    const lines : string[] = readData.split('\n').map(x => x.trim());
    return lines;
};

export const readInput = (fileLocation: string): string => {
    const readData: string = readFileSync(fileLocation, 'utf-8');
    return readData;
};