import { readLines } from '../utils/inputReader';

const lines : string[] = readLines('Day2\\input.txt');

interface PasswordRestriction {
    restrictionCharacter: string
    restrictionLowerBound: number
    restrictionUpperBound: number
}

interface PasswordEntry {
    restriction: PasswordRestriction
    entry: string
}

const ParseInputToPasswordEntries = (lines: string[]): Array<PasswordEntry> => {
    const parsedEntries = new Array<PasswordEntry>();

    lines.forEach(x => {
        const parts: string[] = x.split(' ');

        const bounds: string[] = parts[0].split('-');

        const entry: PasswordEntry = {
            entry: parts[2],
            restriction: {
                restrictionCharacter: parts[1].substring(0, 1),
                restrictionLowerBound: parseInt(bounds[0]),
                restrictionUpperBound: parseInt(bounds[1])
            }
        };

        parsedEntries.push(entry);
    });

    return parsedEntries;
};

const passwordEntries: Array<PasswordEntry> = ParseInputToPasswordEntries(lines);

const countCharacterInString = (data: string, character: string): number => {
    const count =[...data].reduce((a, e) => a + (e == character? 1 : 0), 0);
    return count;
};

const evaluateEntry = (passwordEntry: PasswordEntry): boolean => {
    const occurances: number = countCharacterInString(passwordEntry.entry, passwordEntry.restriction.restrictionCharacter);
    return occurances>= passwordEntry.restriction.restrictionLowerBound && occurances <= passwordEntry.restriction.restrictionUpperBound;
};

const validEntries = passwordEntries.reduce((a, e) => a + (evaluateEntry(e)? 1: 0 ), 0);

console.log(`Part 1 - Valid entries: ${validEntries}`);

const evaluateEntryBasedOnNewRule = (passwordEntry: PasswordEntry): boolean => {
    const firstLocationContainsCharacter: boolean = passwordEntry.entry[passwordEntry.restriction.restrictionLowerBound - 1] == passwordEntry.restriction.restrictionCharacter;
    const secondLocationContainsCharacter: boolean = passwordEntry.entry[passwordEntry.restriction.restrictionUpperBound - 1] == passwordEntry.restriction.restrictionCharacter;

    return (firstLocationContainsCharacter != secondLocationContainsCharacter) && (firstLocationContainsCharacter || secondLocationContainsCharacter);
};

const validEntriesByNewRule = passwordEntries.reduce((a, e) => a + (evaluateEntryBasedOnNewRule(e)? 1: 0 ), 0);

console.log(`Part 2 - Valid entries based on the new rule: ${validEntriesByNewRule}`);



