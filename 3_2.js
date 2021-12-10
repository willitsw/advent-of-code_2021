const transposeData = (rawInput) => {
    const numberOfTransposedRows = rawInput[0].length - 1;
    const transposedData = [];

    let rowCounter = 0;
    while(rowCounter <= numberOfTransposedRows){
        transposedData.push([])
        rowCounter++;
    }

    rawInput.forEach((row) => {
        const splitRow = row.split('');
        splitRow.forEach((char, charIndex) => {
            transposedData[charIndex].push(char)
        })
    })

    return transposedData;
}

const getDeltaGammaCalc = (rawInput) => {
    let oxygenRatingList = [...rawInput];
    let c02RatingList = [...rawInput];
    let index = 0;
    while(oxygenRatingList.length > 1 && index < rawInput[0].length){
        const transposedInput = transposeData(oxygenRatingList);
        const row = transposedInput[index];

        oneCount = row.filter(x => x === "1").length
        zeroCount = row.length - oneCount;

        const isOneOxygen = oneCount >= zeroCount;
        oxygenRatingList = isOneOxygen ? oxygenRatingList.filter(x => x[index] === '1') : oxygenRatingList.filter(x => x[index] === '0');

        index++;
    }

    index = 0;
    while(c02RatingList.length > 1 && index < rawInput[0].length){
        const transposedInput = transposeData(c02RatingList);
        const row = transposedInput[index];

        oneCount = row.filter(x => x === "1").length
        zeroCount = row.length - oneCount;

        const isOneC02 = oneCount >= zeroCount;
        c02RatingList = isOneC02 ? c02RatingList.filter(x => x[index] === '0') : c02RatingList.filter(x => x[index] === '1');

        index++;
    }
    
    console.log(parseInt(oxygenRatingList, 2) * parseInt(c02RatingList, 2))
}

var fs = require('fs');
const rawInput = fs.readFileSync('3_1_input.txt').toString().split("\n");

getDeltaGammaCalc(rawInput);