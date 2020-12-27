import { readInput } from '../utils/inputReader';

const data : string = readInput('Day23\\input.txt');

interface Cup {
    value: number,
    next?: Cup | undefined
}

const arraySize = 1_000_000;
const cups = new Array<Cup>(arraySize);
const input = data.split('').map(x => parseInt(x));
for (let i = input.length + 1; i <= arraySize; i++) {
    input.push(i);    
}

const last: Cup = {value: arraySize, next: undefined};
cups[arraySize] = last;
let lastAdded = last;
for (let i = arraySize - 1; i > 0; i--) {
    const current: Cup = ({value: input[i-1], next: lastAdded});
    cups[current.value] = current;
    lastAdded = current;
}
last.next = cups[input[0]];

const simulateMove = (cups: Array<Cup>, currentCup: Cup): [Array<Cup>, Cup] => {
    let removedCups = new Array<Cup>();
    if(currentCup.next && currentCup.next.next && currentCup.next.next.next)
         removedCups = [ currentCup.next, currentCup.next.next, currentCup.next.next.next];
    currentCup.next = removedCups[2].next;
    const destinationValue = currentCup.value > 1 ? currentCup.value - 1 : arraySize;
    let destination = cups[destinationValue];
    while(removedCups.includes(destination))
        destination = cups[destination.value > 1 ? destination.value - 1 : arraySize];

    if(removedCups[2])
        removedCups[2].next = destination.next;

    destination.next = removedCups[0];

    const newCurrent = currentCup.next || cups[0];

    return [ cups, newCurrent ];
};

let cupState = cups;
let currentCup = cups[input[0]];

for(let i = 0; i <= 10_000_000; i++)  {
    const [ newCupState, newCurrentCup ] = simulateMove(cupState, currentCup);
    cupState = newCupState;
    currentCup = newCurrentCup;
}

// part 2
if(cupState[1].next && cupState[1].next.next)
    console.log(`Part 2 - ${(cupState[1].next.value) * (cupState[1].next.next.value)}`);