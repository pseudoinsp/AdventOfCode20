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

const blackTiles = new Set<string>();

for(const tileData of tilesData) {
    const directions = parseDirections(tileData);

    let currentTile = [0, 0, 0];
    for(const direction of directions) {
        currentTile = moveTile(currentTile, direction); 
    }
    
    const tileHash = currentTile.join(';');
    if(blackTiles.has(tileHash))
        blackTiles.delete(tileHash);
    else
        blackTiles.add(tileHash);
}

console.log(`Part 1 - Number of black tiles: ${blackTiles.size}`);