import { readInput } from '../utils/inputReader';

const data : string = readInput('Day22\\input.txt');

const decks = data.split("\r\n\r\n");

const player1Deck = decks[0].split("\n").filter((_, i) => i !== 0).map(x => parseInt(x));
const player2Deck = decks[1].split("\n").filter((_, i) => i !== 0).map(x => parseInt(x));

const simulateGame = (player1Deck: number[], player2Deck: number[]): [number, number[]] => {
    while(player1Deck.length > 0 && player2Deck.length > 0) {
        const player1Card = player1Deck.shift() || -1;
        const player2Card = player2Deck.shift() || -1;

        const player1WonRound = player1Card > player2Card;

        if(player1WonRound) {
            player1Deck.push(player1Card);
            player1Deck.push(player2Card);
        }
        else {
            player2Deck.push(player2Card);
            player2Deck.push(player1Card);
        }
    }

    if(player1Deck.length > 0)
        return [1, player1Deck];
    else
        return [2, player2Deck];
};

const [winner, winningDeck] = simulateGame(player1Deck, player2Deck);
const winningScore = winningDeck.reduce((a, e, i) => a += e * (winningDeck.length - i), 0);
console.log(`Part 1 - Winner: player ${winner}, deck: ${winningDeck.toString()} score: ${winningScore}`);