import { readInput } from '../utils/inputReader';

const data : string = readInput('Day16\\input.txt');

const parts = data.split("\r\n\r\n");

interface Interval {
    start: number,
    end: number
}

interface Note {
    restrictionName: string,
    intervals: Interval[]
}

const parseNotes = (notesData: string): Array<Note> => {
    const noteDataSplitted = notesData.split("\r\n");

    const collectedNotes = new Array<Note>();
    for(const noteData of noteDataSplitted) {
        const nameAndValue = noteData.split(':');

        const intervalsData = nameAndValue[1].split("or");
        const firstInterval = intervalsData[0].split('-');
        const interval1: Interval =  {
             start: parseInt(firstInterval[0].trim()),
             end: parseInt(firstInterval[1].trim())
        };
        const secondInterval = intervalsData[1].split('-');
        const interval2: Interval =  {
             start: parseInt(secondInterval[0].trim()),
             end: parseInt(secondInterval[1].trim())
        };

        const note: Note = {
            restrictionName: nameAndValue[0],
            intervals: [interval1, interval2]
        };

        collectedNotes.push(note);
    }

    return collectedNotes;
};

const notes = parseNotes(parts[0]);
const nearbyTicketsData = parts[2].split("\r\n").filter((_, i) => i !== 0).map(x => x.split(',').map(x => parseInt(x)));

let sumErrorValue = 0;
for (let i = 0; i < nearbyTicketsData.length; i++) {
    const valuesOfTicket = nearbyTicketsData[i];

    for(const valueOnTicket of valuesOfTicket) {
        let validFromANote = false;
        for(const note of notes) {
            if(note.intervals.filter(x => x.start <= valueOnTicket && x.end >= valueOnTicket).length !== 0) {
                validFromANote = true;
            }
        }

        if(!validFromANote)
            sumErrorValue += valueOnTicket;
    }
}

console.log(`Part 1 - Sum of invalid fields on tickets: ${sumErrorValue}`);