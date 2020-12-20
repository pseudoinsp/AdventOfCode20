import { readInput } from '../utils/inputReader';

const data : string = readInput('Day19\\input.txt');

interface IRule {
    id: number,
    match(pattern: string): [boolean, string];
}

class ReferenceRule implements IRule {

    private rules: Array<IRule>;
    private ownRuleSequences: Array<Array<number>>;
    public id: number;

    constructor(id: number, ownPatterns: Array<Array<number>>,  rules: Array<IRule>) {
        this.id = id;
        this.ownRuleSequences = ownPatterns;
        this.rules = rules;
    }

    match(pattern: string): [boolean, string] {
        for(const ruleSequence of this.ownRuleSequences) {
            let remainingPattern = pattern;
            for(const [index, ruleId] of ruleSequence.entries()) {
                const rule = this.rules[ruleId];
                const [matched, remaining] = rule.match(remainingPattern);
                if(matched) {
                    // console.log(`${pattern} matched on ${rule.id}`);
                    remainingPattern = remaining;

                    if(index === ruleSequence.length - 1)
                        return [true, remainingPattern];
                }
                else {
                    // console.log(`${pattern} failed on ${rule.id}`);
                    break;
                }
            }
        }

        return [false, pattern];
    }
}

class SelfDescribedRule implements IRule {
    public id: number;
    private ownPattern: string; 

    constructor(id: number, ownPattern: string) {
        this.id = id;
        this.ownPattern = ownPattern;
    }

    match(pattern: string): [boolean, string] {
        const matched = pattern[0] === this.ownPattern;
        return [matched, pattern.slice(1)];
    }
}

const parseInput = (input: string[]): Array<IRule> => {
    const parsedRules = new Array<IRule>();

    for(const line of input) {
        const parts = line.split(":");
        const id = parseInt(parts[0]);
        const pattern = parts[1].trim();

        if(pattern[0] === "\"") {
            const rule = new SelfDescribedRule(id, pattern[1]);
            parsedRules.push(rule);
        }
        else {
            const patterns = pattern.split("|");
            const parsedPatterns = patterns.map(x => x.trim()).map(x => x.split(' '));
            const p = parsedPatterns.map(x => x.map(y => parseInt(y)));
            const rule = new ReferenceRule(id, p, parsedRules);
            parsedRules.push(rule);
        }
    }

    parsedRules.sort((a, b) => a.id - b.id);
    return parsedRules;
};

const dataParts = data.split("\r\n\r\n");
const rules = parseInput(dataParts[0].split("\r\n"));
const messages = dataParts[1].split("\r\n");

let successfulMatches = 0;
for(const message of messages) {
    const [matched, rem] = rules[0].match(message);
    if(matched && rem === "")
        successfulMatches++;
    // console.log(`${message} matching rule 0: ${ matched? "yes" : "no"}, remaining: ${rem}`);
}

console.log(`Part 1 - successful matches: ${successfulMatches}`);