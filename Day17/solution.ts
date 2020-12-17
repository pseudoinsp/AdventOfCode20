import { readLines } from '../utils/inputReader';

const data : string[] = readLines('Day17\\input.txt');

// coordinates are stored as strings to be able to used as keys ..............
let currentActiveCubes = new Set<string>();

for (let x = 0; x < data.length; x++) {
    for (let y = 0; y < data[x].length; y++) {
        if (data[x][y] === "#")
            currentActiveCubes.add(JSON.stringify([x, y, 0]));
    }
}

const GetNeighboursOfCoordinate = (coordinate: [number, number, number]): Array<[number, number, number]> => {

    const collectedNeighbours = new Array<[number, number, number]>();

    for (let x = coordinate[0] - 1; x <= coordinate[0]+1; x++) {
        for (let y = coordinate[1] - 1; y <= coordinate[1]+1; y++) {
            for (let z = coordinate[2] - 1; z <= coordinate[2]+1; z++) {
                if(!(x === coordinate[0] && y === coordinate[1] && z === coordinate[2]))
                    collectedNeighbours.push([x, y, z]);
            }   
        }
    }

    return collectedNeighbours;
};

const simulateCycle = (activeCubes: Set<string>): Set<string> => {

    const relevantCubes = new Set<[number, number, number]>();

    for(const activeCube of activeCubes) {
        const neighbours = GetNeighboursOfCoordinate(JSON.parse(activeCube));
        neighbours.forEach(x => relevantCubes.add(x));
    }

    const nextActiveCubes = new Set<string>();

    for(const relevantCube of relevantCubes) {
        const neighbours = GetNeighboursOfCoordinate(relevantCube);
        
        // if active -> 2 or 3 active neighbours to stay active
        const activeNeighbours = neighbours.filter(x => activeCubes.has(JSON.stringify(x))).length;
        if(activeCubes.has(JSON.stringify(relevantCube))) {
            if(activeNeighbours === 2 || activeNeighbours === 3)
                nextActiveCubes.add(JSON.stringify(relevantCube));
        }
        // if inactive -> 3 active neighbours to go active
        else {
            if(activeNeighbours === 3) {
                nextActiveCubes.add(JSON.stringify(relevantCube));
            }
        }
    }

    return nextActiveCubes;
};

for (let i = 0; i < 6; i++) {
    const newActiveCubes  = simulateCycle(currentActiveCubes);
    console.log(`cycle ${i+1}: ${newActiveCubes.size}`);
    currentActiveCubes = newActiveCubes;
}

console.log(currentActiveCubes.size);