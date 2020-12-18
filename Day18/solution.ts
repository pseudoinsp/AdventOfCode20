import { readLines } from '../utils/inputReader';

const data : string[] = readLines('Day18\\input.txt');

const processExpressionWithoutParantheses = (expression: string, startI: number, endI: number): string => {
    const relvevantPart = expression.substring(startI, endI);
    const parts = relvevantPart.split(' ');

    while(parts.length !== 1) {
        // solve + parts
        // this is slower, but dont have to deal with index shifts that would happen if we try to solve them in one iteration
        const firstSum = parts.findIndex(x => x === "+");

        if(firstSum !== -1) {
            const res = parseInt(parts[firstSum-1]) + parseInt(parts[firstSum+1]);
            // remove the operator and operands...
            parts.splice(firstSum-1, 3);
            // and insert the operation result into their place
            parts.splice(firstSum-1, 0, res.toString());    
        }
        else {
            if(parts[1] === "*") { 
                const res = parseInt(parts[0]) * parseInt(parts[2]);
                parts.splice(0, 3);
                parts.splice(0, 0, res.toString());    
            }
        }
    }

    return parts[0];
};

const resolveInnermostParentheses = (expression: string): [boolean, string] => {

    let exprCopy = expression;
    let paranthesesBegin = -1;
    let ongoingProcessing = false;
    let resolveHappened = false;

    for(let i = 0; i< exprCopy.length; i++) {
        if(exprCopy[i] === "(") {
            paranthesesBegin = i;
            ongoingProcessing = true;
        }
        else if (exprCopy[i] === ")" && ongoingProcessing) {
            const resolvedPart = processExpressionWithoutParantheses(exprCopy, paranthesesBegin + 1, i);
            exprCopy = exprCopy.substring(0, paranthesesBegin) + resolvedPart + exprCopy.substring(i+1);
            i = paranthesesBegin;
            ongoingProcessing = false;
            resolveHappened = true;
            paranthesesBegin = -1;
        }
    }

    return [resolveHappened, exprCopy];
};

const resolveExpression = (expression: string): number => {
    let parenthesisResolveHappened = true;
    while(parenthesisResolveHappened) {
        const res = resolveInnermostParentheses(expression);
        parenthesisResolveHappened = res[0];
        expression = res[1];
    }

    const res = processExpressionWithoutParantheses(expression, 0, expression.length);
    return parseInt(res);
};

let sumOfExpressions = 0;
for(const expression of data) {
    const expressionResult = resolveExpression(expression);
    sumOfExpressions += expressionResult;
}

console.log(`Part 2 - Sum of all expressions: ${sumOfExpressions}`);