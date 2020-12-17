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

const testTicketForValidity = (fieldsOfTicket: number[]): boolean => {
    for(const valueOnTicket of fieldsOfTicket) {
        let validFromANote = false;
        for(const note of notes) {
            if(note.intervals.filter(x => x.start <= valueOnTicket && x.end >= valueOnTicket).length !== 0) {
                validFromANote = true;
            }
        }

        if(!validFromANote)
            return false;
    }

    return true;
};

const notes = parseNotes(parts[0]);
const nearbyTicketsData = parts[2].split("\r\n").filter((_, i) => i !== 0).map(x => x.split(',').map(x => parseInt(x)));
const nearbyValidTickets = nearbyTicketsData.filter(x => testTicketForValidity(x));

const calculateFields = (tickets: number[][], notes: Note[]): Map<number, Note> => {
    const matchedFields = new Map<number, Note>();

    // until every ticket value is mapped to a respective note
    while(matchedFields.size !== tickets[0].length) {
        // iterate through every ticket value
        for(let i = 0; i < tickets[0].length; i++) {
            const matchedNotes = Array.from(matchedFields.values());
            const unmatchedNotesSoFar = notes.filter(x => !matchedNotes.includes(x));
            let candidatesForThisTicketValue = unmatchedNotesSoFar.map(x => x);
            // iterate through every ticket
            for(let j = 0; j < tickets.length; j++) {
                const ticketValue = tickets[j][i];

                for(const note of candidatesForThisTicketValue) {
                    if(note.intervals.filter(x => x.start <= ticketValue && x.end >= ticketValue).length === 0) {
                        candidatesForThisTicketValue = candidatesForThisTicketValue.filter(x => x !== note);
                    }
                }
            }

            // only map if the matching is definite
            if(candidatesForThisTicketValue.length === 1) {
                matchedFields.set(i, candidatesForThisTicketValue[0]);
            }
        }
    }

    return matchedFields;
};

// Part 1
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

// Part 2
const mapping = calculateFields(nearbyValidTickets, notes);
const mappingArray = [...mapping];
const departureIndexes = mappingArray.filter(x => x[1].restrictionName.startsWith("departure")).map(x => x[0]);

const myTicketData =  parts[1].split("\r\n").filter((_, i) => i !== 0).map(x => x.split(',').map(x => parseInt(x)))[0];

let multipliedFieldValues = 1;
for(const index of departureIndexes) {
    multipliedFieldValues *= myTicketData[index];
}

console.log(`Part 2 - Multiplied departure field values on own ticket: ${multipliedFieldValues}`);