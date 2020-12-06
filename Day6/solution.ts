import { readInput } from '../utils/inputReader';

const input : string = readInput('Day6\\input.txt');

const groups = input.split("\r\n\r\n");

const aggreagatedAnswers = new Array<Set<string>>();
for(const group of groups) {
    const collectedAnswers = group.split('\r\n');
    const answersInGroup = new Set<string>();
    
    for(const answer of collectedAnswers) {
        for(const char of answer)
        answersInGroup.add(char);
    }

    aggreagatedAnswers.push(answersInGroup);
}

const sumOfAnswers = aggreagatedAnswers.reduce((a, e) => a += e.size, 0);
console.log(`Part 1 - ${sumOfAnswers}`);