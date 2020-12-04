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

const evaluatePassport = (passport: string): boolean => {
    const parts = passport.split(' ');
    const categories: string[] = parts.map(x => x.split(':')[0]);
    return categories.length === 8 || (categories.length === 7) && !categories.includes("cid"); 
};

const validPassports = passports.filter(evaluatePassport);

console.log(`Part 1 - Valid passports: ${validPassports.length}`);

// const requiredFields = new Set<string>();
// requiredFields.add("byr");
// requiredFields.add("iyr");
// requiredFields.add("eyr");
// requiredFields.add("hgt");
// requiredFields.add("hcl");
// requiredFields.add("ecl");
// requiredFields.add("pid");

// interface Passport {
//     ecl: string
//     pid: number
//     eyr: number
//     hcl: string
//     byr: number
//     iyr: number
//     cid: number
//     hgt: string
// }

// const parsePassports(lines: string[]): Array<Passport> => {
//     lines.map(line => {
//         const parts = line.split(' ');
//         parts.
//         return {
//             ecl
//         }
//     })
// }