import { readInput } from '../utils/inputReader';

const data : string = readInput('Day22\\input.txt');

const decks = data.split("\r\n\r\n");

const player1Deck = decks[0].split("\n").filter((_, i) => i !== 0).map(x => parseInt(x));
const player2Deck = decks[1].split("\n").filter((_, i) => i !== 0).map(x => parseInt(x));

const simulateGame = (gameId: number, player1Deck: number[], player2Deck: number[]): [number, number[]] => {
    // let round = 1;
    const earlierPlayer1Hashes = new Set<string>();
    const earlierPlayer2Hashes = new Set<string>();


    while(player1Deck.length > 0 && player2Deck.length > 0) {
        if(earlierPlayer1Hashes.has(JSON.stringify(player1Deck)) || earlierPlayer2Hashes.has(JSON.stringify(player2Deck)))
            return [1, player1Deck];

        earlierPlayer1Hashes.add(JSON.stringify(player1Deck));
        earlierPlayer2Hashes.add(JSON.stringify(player2Deck));

        const player1Card = player1Deck.shift() || -1;
        const player2Card = player2Deck.shift() || -1;

        let player1WonRound = false;
        // check for recursive game
        if(player1Deck.length >= player1Card && player2Deck.length >= player2Card) {
            const player1RecursiveDeck = player1Deck.slice(0, player1Card);
            const player2RecursiveDeck = player2Deck.slice(0, player2Card);
            const [ winningPlayer ] = simulateGame(gameId + 1, player1RecursiveDeck, player2RecursiveDeck);
            player1WonRound = winningPlayer === 1;
        }
        else {
            player1WonRound = player1Card > player2Card;
        }

        // console.log(`Game: ${gameId} round ${round} winner: ${player1WonRound ? "P1" : "P2"}`);
        if(player1WonRound) {
            player1Deck.push(player1Card);
            player1Deck.push(player2Card);
        }
        else {
            player2Deck.push(player2Card);
            player2Deck.push(player1Card);
        }

        // round++;
    }

    if(player1Deck.length > 0)
        return [1, player1Deck];
    else
        return [2, player2Deck];
};

const [winner, winningDeck] = simulateGame(1, player1Deck, player2Deck);
const winningScore = winningDeck.reduce((a, e, i) => a += e * (winningDeck.length - i), 0);

console.log(`Part 2 - Winner: player ${winner}, deck: ${winningDeck.toString()} score: ${winningScore}`);