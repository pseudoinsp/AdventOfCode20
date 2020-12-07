import { readLines } from '../utils/inputReader';

const lines : string[] = readLines('Day7\\input.txt');

class Bag {
    name: string;
    canContain: Array<[number, Bag]>;
    canBecontainedBy: Array<Bag>;

    constructor(name: string) {
        this.name = name;
        this.canContain = new Array<[number, Bag]>();
        this.canBecontainedBy = new Array<Bag>();
    }
}

const parseInput = (input: string[]): Map<string, Bag> => {

    const bags = new Map<string, Bag>();

    for(const line of input) {
        const x = line.split('contain');
        const definedBagName = x[0].replace(" bags", "").trim();

        const bag = GetOrCreateBag(definedBagName, bags);

        if(x[1].trim() === "no other bags.") 
            continue;

        const canContainParts = x[1].split(',');

        for(const part of canContainParts) {
            const xy = part.trim().split(' ');
            const quantity = parseInt(xy[0]);
            const containedBagName = xy[1] + " " + xy[2];

            const containedBag: Bag = GetOrCreateBag(containedBagName, bags);

            containedBag.canBecontainedBy.push(bag);
            bag.canContain.push([quantity, containedBag]);
        }
    }

    return bags;
};

const GetOrCreateBag = (bagName: string, bags: Map<string, Bag>): Bag => {
    let bag = bags.get(bagName);
    if(!bag) {
        bag = new Bag(bagName);
        bags.set(bagName, bag);
    }

    return bag;
};

const bags: Map<string, Bag> = parseInput(lines);

// Part 1
const shinyGoldBag = bags.get('shiny gold') || new Bag("impossible case yo");
const canBeContainedBy = new Set<Bag>();

const collectCanBeContainedBy = (bag: Bag, references: Set<Bag>): void  => {
    for(const ccby of bag.canBecontainedBy) {
        references.add(ccby);
        collectCanBeContainedBy(ccby, references);
    }
};

// Part 2
let sum = 0;
const collectContainedBags = (bag: Bag, parentCount: number) => {
    for(const [containedQuantity, containedBag] of bag.canContain) {
        sum += containedQuantity * parentCount;
        collectContainedBags(containedBag, containedQuantity * parentCount);
    }
};

collectCanBeContainedBy(shinyGoldBag, canBeContainedBy);
collectContainedBags(shinyGoldBag, 1);

console.log(`Part 1 - Shiny gold bags can be contained by ${canBeContainedBy.size} other bag types.`);
console.log(`Part 2 - One shiny gold bag must contain ${sum} bags.`);