import { readLines } from '../utils/inputReader';

const lines : string[] = readLines('Day11\\input.txt');

let seats: string[][] = [];

lines.map(x => seats.push([...x]));

const getNeighbours = (seats: string[][], x: number, y: number): number => {
    let neighbours = 0;

    if (x > 0 && y > 0)
        neighbours = neighbours + (seats[x - 1][y - 1] === "#" ? 1 : 0);
    if (y > 0)
        neighbours = neighbours + (seats[x][y - 1] === "#" ? 1 : 0);
    if (x < seats.length - 1 && y > 0)
        neighbours = neighbours + (seats[x + 1][y - 1] === "#" ? 1 : 0);
    if (x > 0)
        neighbours = neighbours + (seats[x - 1][y] === "#" ? 1 : 0);
    if (x < seats.length - 1)
        neighbours = neighbours + (seats[x + 1][y] === "#" ? 1 : 0);
    if (x > 0 && y < seats[0].length - 1)
        neighbours = neighbours + (seats[x - 1][y + 1] === "#" ? 1 : 0);
    if (y < seats[0].length - 1)
        neighbours = neighbours + (seats[x][y + 1] === "#" ? 1 : 0);
    if (x < seats.length - 1 && y < seats[0].length - 1)
        neighbours = neighbours + (seats[x + 1][y + 1] === "#" ? 1 : 0);

    return neighbours;
};

const evaluateField = (seats: string[][], x: number, y: number): string => {
    const currentValue = seats[x][y];
    const neighbours = getNeighbours(seats, x, y);
    if(currentValue === "L" && neighbours === 0) 
        return "#";
    else if (currentValue === "#" && neighbours >= 4)    
        return "L";
    return currentValue;
};

let changed = true;
while(changed) {
    changed = false;

    const seatCopy = seats.map(x => x.slice());
    for (let i = 0; i < seats.length; i++) {
        for (let j = 0; j < seats[i].length; j++) {
            const evaluation = evaluateField(seats, i, j);
            if(evaluation !== seats[i][j]) {
                changed = true;
                seatCopy[i][j] = evaluation;    
            }
        }
    }

    seats = seatCopy;
}

// console.log(seats);

const seatsTaken = seats.reduce((a, e) => { 
    const seatsTakenThisLine = [...e].reduce((aI, eI) => aI = aI + (eI === "#" ? 1 : 0), 0);
    a += seatsTakenThisLine;
    return a;
}, 0);

console.log(`Part 1 - Seats taken after stabilization: ${seatsTaken}`);