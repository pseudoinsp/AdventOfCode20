import { readLines } from '../utils/inputReader';

const foodData : string[] = readLines('Day21\\input.txt');

const ingredientsAndOccurances = new Map<string, number>();
const allergensAndIngredientCandidates = new Map<string, Array<string>>();

const parseIngredientList = (data: string): [ingredients: string[], allergens: string[]] =>{
    const parts = data.split("(");

    let ingredients = parts[0].split(' ');
    ingredients = ingredients.filter((_, i) => i !== ingredients.length - 1);

    let allergens = parts[1].split(',');
    // cut contains
    allergens[0] = allergens[0].split(' ')[1];
    // cut ending )
    allergens[allergens.length - 1] = allergens[allergens.length - 1].substring(0, allergens[allergens.length - 1].length - 1);
    allergens = allergens.map(x => x.trim());

    return  [ingredients, allergens];
};

for(const ingredientList of foodData) {
    const [ ingredients, allergens ] = parseIngredientList(ingredientList);    

    for(const ingredient of ingredients) {
        const occurances = ingredientsAndOccurances.get(ingredient);
        if(occurances)
            ingredientsAndOccurances.set(ingredient, occurances + 1);
        else
            ingredientsAndOccurances.set(ingredient, 1);
    }

    // collect the ingredient - allergen mapping that were determined this turn
    const ingredientsDeterminedThisTurn = new Array<string>();

    for(const allergen of allergens) {
        const ingredientCandidates = allergensAndIngredientCandidates.get(allergen);
        if(ingredientCandidates) {
            const commonIngredients = ingredientCandidates.filter(x => ingredients.includes(x));
            allergensAndIngredientCandidates.set(allergen, commonIngredients);
            if(commonIngredients.length === 1)
                ingredientsDeterminedThisTurn.push(commonIngredients[0]);
        }
        else {
            const alreadyDeterminedIngredients = ([...allergensAndIngredientCandidates.entries()]).filter(x => x[1].length === 1).map(x => x[1][0]);
            const possibleIngredients = ingredients.filter(x => !alreadyDeterminedIngredients.includes(x));
            allergensAndIngredientCandidates.set(allergen, possibleIngredients);
            if(ingredients.length === 1)
                ingredientsDeterminedThisTurn.push(ingredients[0]);
        }
    }

    // for every freshly determined ingredient - allergen mapping, remove the ingredient from every other allergen which have the ingredient as candidate
    for(const determinedIngredient of ingredientsDeterminedThisTurn) {
        for(const allergen of allergensAndIngredientCandidates.keys()) {
            const ingredients = allergensAndIngredientCandidates.get(allergen) || [""];
            if (ingredients.length !== 1) {   
                const remainingIngredients = ingredients.filter(x => x !== determinedIngredient);
                allergensAndIngredientCandidates.set(allergen, remainingIngredients);
            }
        }
    }
}

console.log(allergensAndIngredientCandidates);
const potentialAllergenIngredients = new Set([...allergensAndIngredientCandidates.values()].flat());

const nonAllergenIngredientsAndOccurances = [...ingredientsAndOccurances].filter(x => !potentialAllergenIngredients.has(x[0]));

const safeIngredientOccurances = nonAllergenIngredientsAndOccurances.reduce((a, e) => a += e[1], 0);

console.log(`Part 1 - Sum of safe ingredient occurances: ${safeIngredientOccurances}`);

// part 2
// TODO the mapping is bugged, two allergens have 2 ingredient candidates, was finished manually :)
const knownAllergenAndIngredientMappings = ([...allergensAndIngredientCandidates.entries()]);
// const knownAllergenAndIngredientMappings = ([...allergensAndIngredientCandidates.entries()]).filter(x => x[1].length === 1);
knownAllergenAndIngredientMappings.sort();
console.log(knownAllergenAndIngredientMappings);
const dangerousIngredients = [...knownAllergenAndIngredientMappings.map(x => x[1])].flat();
const dangerousIngredientsList = dangerousIngredients.join(',');
console.log(`Part 2 - Dangerous ingredients alphabetically: ${dangerousIngredientsList}`);