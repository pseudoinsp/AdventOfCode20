import { readLines } from '../utils/inputReader';

const data : string[] = readLines('Day18\\input.txt');

const processExpressionWithoutParanthesis = (expression: string, startI: number, endI: number): string => {
    const relvevantPart = expression.substring(startI, endI);
    const parts = relvevantPart.split(' ');

    while(parts.length !== 1) {
        let res = -1;
        switch (parts[1]) {
            case "+":
                res = parseInt(parts[0]) + parseInt(parts[2]);
                break;
            case "*":
                res = parseInt(parts[0]) * parseInt(parts[2]);
                break;
        }
        parts.shift();
        parts.shift();
        parts.shift();
        parts.unshift(res.toString());
    }

    return parts[0];
};

const resolveInternalParentheses = (expression: string): [boolean, string] => {

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
            const resolvedPart = processExpressionWithoutParanthesis(exprCopy, paranthesesBegin + 1, i);
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
        const res = resolveInternalParentheses(expression);
        parenthesisResolveHappened = res[0];
        expression = res[1];
    }

    const res = processExpressionWithoutParanthesis(expression, 0, expression.length);
    return parseInt(res);
};

let sumOfExpressions = 0;
for(const expression of data) {
    const expressionResult = resolveExpression(expression);
    sumOfExpressions += expressionResult;
}

console.log(`Part 1 - Sum of all expressions: ${sumOfExpressions}`);