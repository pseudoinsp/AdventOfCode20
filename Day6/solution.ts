import { readInput } from '../utils/inputReader';

const input : string = readInput('Day6\\input.txt');

const groups = input.split("\r\n\r\n");

interface AnswerAggreagator {
    AggregateAnswers(rawData: string[]): Array<Set<string>>
}

class UnionAnswerAggregator implements AnswerAggreagator {
    AggregateAnswers(rawData: string[]): Set<string>[] {
        const aggreagatedAnswers = new Array<Set<string>>();
        for(const group of rawData) {
            const collectedAnswers = group.split('\r\n');
            const answersInGroup = new Set<string>();
            
            for(const answer of collectedAnswers) {
                for(const char of answer)
                    answersInGroup.add(char);
            }

            aggreagatedAnswers.push(answersInGroup);
        }

        return aggreagatedAnswers;
    }
}

class IntersectAnswerAggregator implements AnswerAggreagator {
    AggregateAnswers(rawData: string[]): Set<string>[] {
        const aggreagatedAnswers = new Array<Set<string>>();
        for(const group of rawData) {
            const collectedAnswers = group.split('\r\n');
            let answersInGroup = new Set<string>();
            for(const [i, answer] of collectedAnswers.entries()) {
                const questionsOfPerson = new Set<string>();
                for(const char of answer)
                    questionsOfPerson.add(char);

                if(i === 0) answersInGroup = questionsOfPerson;
                answersInGroup = new Set<string>([...questionsOfPerson].filter(x => answersInGroup.has(x))); 
            }

            aggreagatedAnswers.push(answersInGroup);
        }

        return aggreagatedAnswers;
    }
}

const aggregateforUnion = new UnionAnswerAggregator().AggregateAnswers(groups);

const sumOfAnswers = aggregateforUnion.reduce((a, e) => a += e.size, 0);
console.log(`Part 1 - Sum of group answers for every question: ${sumOfAnswers}`);

const aggregateforIntersects = new IntersectAnswerAggregator().AggregateAnswers(groups);
const sumOfAnswersPartB = aggregateforIntersects.reduce((a, e) => a += e.size, 0);
console.log(`Part 2 - Sum of group answers for common questions: ${sumOfAnswersPartB}`);