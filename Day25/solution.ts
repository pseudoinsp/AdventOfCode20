import { readLines } from '../utils/inputReader';

const publicKeyData : string[] = readLines('Day25\\input.txt');

const divider = 20201227;

const determineLoopSize = (publicKey : number): number => {
    let value = 1;
    let loop = 1;
    
    const subjectNumber = 7;

    while(value != publicKey) {
        value = value * subjectNumber % divider;
        loop++;
    }

    // -1 since the last increment is unnecessary in the cycle
    return loop - 1;
};

const determineEncryptionKey = (subjectNumber: number, loop: number): number => {
    let value = 1;

    for(let i = 0; i < loop; i++) {
        value = value * subjectNumber % divider;
    }

    return value;
};

const cardPublicKey = parseInt(publicKeyData[0]);
const doorPublicKey = parseInt(publicKeyData[1]);

determineLoopSize(cardPublicKey);
const doorLoop = determineLoopSize(doorPublicKey);

const encryptionKey = determineEncryptionKey(cardPublicKey, doorLoop);
console.log(`Part 1 - Encryption key: ${encryptionKey}`);