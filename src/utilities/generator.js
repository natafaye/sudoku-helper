/**
 * Generates all the possible way to fill squares in Sudoku/Kakuro to get a particular sum
 * 
 * @param {number} sum The sum of all the squares when filled
 * @param {number} numSquares The number of squares to fill
 * @param {number[]} excludedDigits The digits that should not be used
 * @returns an array of all the possible ways to fill the squares, each of which is an array of numbers
 */
export const generatePossibilities = (sum, numSquares, excludedDigits = [], includedDigits = []) => {
    // Handle out of bounds inputs
    if(numSquares <= 0 || sum <= 0 || sum > 45 || includedDigits.some(d => excludedDigits.includes(d))) 
        return [];

    // adjust numbers for calculations if there are already included digits
    if(includedDigits.length) {
        sum -= includedDigits.reduce((t, d) => t + d, 0);
        numSquares -= includedDigits.length;
        excludedDigits = [...excludedDigits, ...includedDigits];

        // Handle if the included digits are too large or too many
        if(sum < 0 || numSquares < 0) return []
        
        // Handle if there's no squares or sum to fill after accounting for included digits
        if(numSquares === 0 || sum === 0) return (sum === 0 && numSquares === 0) ? includedDigits : []
    }

    // Handle if there's only one square to fill
    if(numSquares === 1) 
        return (sum <= 9 && !excludedDigits.includes(sum)) ? [[sum, ...includedDigits]] : [];

    // Keep track of the generated possiblities and the digits that have already been checked
    let possibilities = [];
    const checkedDigits = [];

    // Loop over digits and stop before checking digits that would require 
    // a lower digit to complete the sum to avoid repeated checks
    for(let currDigit = 1; currDigit < sum / numSquares; currDigit++) {

        // Avoid checking excluded digits
        if(excludedDigits.includes(currDigit)) continue;

        // Make a list of digits to exclude
        checkedDigits.push(currDigit);
        const newExcludedDigits = [...excludedDigits, ...checkedDigits];

        // Recursively generate the possibilities with the remaineder as the sum
        const remainderPossiblities = generatePossibilities(
            sum - currDigit, 
            numSquares - 1, 
            newExcludedDigits
        )

        // Add current digit to get the full sum
        const newPossiblities = remainderPossiblities.map(digits => [currDigit, ...digits])

        // Add the new possibilites to the list
        possibilities.push(...newPossiblities);
    }

    // Adjust possiblities if there are already included digits
    if(includedDigits.length)
        possibilities = possibilities.map(p => [...p, ...includedDigits].sort((a, b) => a - b))

    return possibilities;
}