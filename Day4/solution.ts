import { readLines } from '../utils/inputReader';

const lines : string[] = readLines('Day4\\input.txt');

const processInput = (lines: string[]): Array<string> => {
    const passports = new Array<string>();

    let processingLine = 0;
    while(processingLine < lines.length) {
        let passportData = "";
        while(lines[processingLine] != '' && processingLine < lines.length) {
            passportData += lines[processingLine] + " ";
            processingLine++;
        }
        processingLine++;

        // trim??
        passportData = passportData.substring(0, passportData.length - 1);
        passports.push(passportData);
    }

    return passports;
};

const passports = processInput(lines);

const rules = new Map<string, (passportPartValue: string)=> boolean>();
rules.set("byr", pp => {
        const value = parseInt(pp);
        return value >= 1920 && value <= 2002;
    });
rules.set("iyr", pp => {
    const value = parseInt(pp);
    return value >= 2010 && value <= 2020;
});
rules.set("eyr", pp => {
    const value = parseInt(pp);
    return value >= 2020 && value <= 2030;
});
rules.set("hgt", pp => {
    const scale = pp.substring(pp.length - 2, pp.length).toString();
    const value = parseInt(pp.substring(0, pp.length - 2));
    if(scale === "cm")
        return value >= 150 && value <= 193;
    else if (scale === "in")
        return value >= 59 && value <= 76;
    return false;
});
rules.set("hcl", pp => {
    if(pp[0] !== "#") return false;
    const value = pp.substring(1);
    if(value.length !== 6) return false;
    return [...value].filter(c => (c >= "a" && c <= "f") || c === "0" || parseInt(c)).length === 6;
});
rules.set("ecl", pp => {
    // should use set<string>
    return pp === "amb" || pp === "blu" ||pp === "brn" ||pp === "gry" ||pp === "grn" ||pp === "hzl" || pp === "oth";
});
rules.set("pid", pp => {
    if (pp.length !== 9) return false;
    return [...pp].filter(x => x === "0" || parseInt(x)).length === 9;
});

const evaluatePassport = (passport: string): boolean => {
    const parts: string[] = passport.split(' ');

    if(parts.length < 7) return false;
    if(parts.length === 7 && parts.map(x => x.split(':')[0]).includes("cid")) return false;

    for(const part of parts) {
        const partComponents = part.split(':');
        const field = partComponents[0];
        const value = partComponents[1];

        const ruleForField = rules.get(field);
        if(ruleForField && !ruleForField(value)) 
            return false;
    }

    return true; 
};

const validPassports = passports.filter(evaluatePassport);

console.log(`Part 2 - Valid passports: ${validPassports.length}`);