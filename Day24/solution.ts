import { exception } from 'console';
import { readLines } from '../utils/inputReader';

const tilesData : string[] = readLines('Day24\\input.txt');

enum HexagonDirection {
    West,
    East,
    Northeast,
    Northwest,
    Southeast,
    Southwest
}

const parseDirections = (rawDirections: string): Array<HexagonDirection> => {
    let currentIndex = 0;
    const parsedDirections = new Array<HexagonDirection>();

    while(currentIndex < rawDirections.length) {
        if(rawDirections[currentIndex] === "e") {
            parsedDirections.push(HexagonDirection.East);
            currentIndex++;
        }
        else if(rawDirections[currentIndex] === "w") {
            parsedDirections.push(HexagonDirection.West);
            currentIndex++;
        }
        else if (rawDirections[currentIndex] === "s") {
            if (rawDirections[currentIndex+1] === "e") {
                parsedDirections.push(HexagonDirection.Southeast);
                currentIndex += 2;
            }
            else if (rawDirections[currentIndex+1] === "w") {
                parsedDirections.push(HexagonDirection.Southwest);
                currentIndex += 2;
            }
        }
        else if (rawDirections[currentIndex] === "n") {
            if (rawDirections[currentIndex+1] === "e") {
                parsedDirections.push(HexagonDirection.Northeast);
                currentIndex += 2;
            }
            else if (rawDirections[currentIndex+1] === "w") {
                parsedDirections.push(HexagonDirection.Northwest);
                currentIndex += 2;
            }
        }
    }

    return parsedDirections;
};

const moveTile = (pos: number[], dir: HexagonDirection): number[] => {
    switch (dir) {
        case HexagonDirection.East:
            return [pos[0] + 1, pos[1] - 1, pos[2]];    
        case HexagonDirection.West:
            return [pos[0] - 1, pos[1] + 1, pos[2]];    
        case HexagonDirection.Northeast:
            return [pos[0], pos[1] -1, pos[2] + 1];    
        case HexagonDirection.Northwest:
            return [pos[0] - 1, pos[1], pos[2] + 1];    
        case HexagonDirection.Southeast:
            return [pos[0] + 1, pos[1], pos[2] - 1];    
        case HexagonDirection.Southwest:
            return [pos[0], pos[1] + 1, pos[2] - 1];    
        default:
            throw exception;
    }
};

const getStringRepresentationOfCoordinate = (coordinate: number[]): string => {
    return coordinate.join(';');
};

const getCoordinateFromStringRepresentation = (coordinate: string): number[] => {
    const coords = coordinate.split(";").map(x => parseInt(x));
    return [coords[0], coords[1], coords[2]];
};

const getNeighboursOfCoordinate = (coordinate: number[]): Array<number[]> => {
    const neighbours = new Array<number[]>();

    neighbours.push([coordinate[0] + 1, coordinate[1] - 1, coordinate[2]]);
    neighbours.push([coordinate[0] - 1, coordinate[1] + 1, coordinate[2]]);
    neighbours.push([coordinate[0], coordinate[1] - 1, coordinate[2] + 1]);
    neighbours.push([coordinate[0] - 1, coordinate[1], coordinate[2] + 1]);
    neighbours.push([coordinate[0] + 1, coordinate[1], coordinate[2] - 1]);
    neighbours.push([coordinate[0], coordinate[1] + 1, coordinate[2] - 1]);

    return neighbours;
};

const simulateDay = (blackTilesTheDayBefore: Set<string>): Set<string> => {
    const relevantTiles = new Set<number[]>([...blackTilesTheDayBefore].map(x => getNeighboursOfCoordinate(getCoordinateFromStringRepresentation(x))).flat());
    blackTilesTheDayBefore.forEach(x => relevantTiles.add(getCoordinateFromStringRepresentation(x)));

    const blackTilesThisDay = new Set<string>();

    for(const relevantTile of relevantTiles) {
        const neighbours = getNeighboursOfCoordinate(relevantTile);

        const relevantTileAsString = getStringRepresentationOfCoordinate(relevantTile);
        const blackAdjacentTiles = neighbours.filter(x => blackTilesTheDayBefore.has(getStringRepresentationOfCoordinate(x))).length;
        // Any black tile with zero or more than 2 black tiles immediately adjacent to it is flipped to white.
        if(blackTilesTheDayBefore.has(relevantTileAsString))  {
            if(blackAdjacentTiles === 1 || blackAdjacentTiles === 2)
                blackTilesThisDay.add(relevantTileAsString);
        }
        // Any white tile with exactly 2 black tiles immediately adjacent to it is flipped to black.
        else {
            if(blackAdjacentTiles === 2)
                blackTilesThisDay.add(relevantTileAsString);
        }
    }

    return blackTilesThisDay;
};

let blackTiles = new Set<string>();

for(const tileData of tilesData) {
    const directions = parseDirections(tileData);

    let currentTile = [0, 0, 0];
    for(const direction of directions) {
        currentTile = moveTile(currentTile, direction); 
    }
    
    const tileHash = getStringRepresentationOfCoordinate(currentTile);
    if(blackTiles.has(tileHash))
        blackTiles.delete(tileHash);
    else
        blackTiles.add(tileHash);
}

console.log(`Part 1 - Number of black tiles on day 0: ${blackTiles.size}`);

// part 2 
for (let i = 1; i <= 100; i++) {
    blackTiles = simulateDay(blackTiles);
}

console.log(`Part 2 - Black tiles after on day 100: ${blackTiles.size}`);