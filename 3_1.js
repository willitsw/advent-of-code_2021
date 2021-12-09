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

const getDeltaGammaCalc = (transposedInput) => {
    let delta = '';
    let gamma = '';
    
    transposedInput.forEach(row => {
        oneCount = row.filter(x => x === "1").length
        zeroCount = row.length - oneCount;

        const isOne = oneCount > zeroCount;

        if(isOne){
            delta += '1';
            gamma += '0';
        }else{
            delta += '0';
            gamma += '1';
        }
    })
    
    console.log(parseInt(delta, 2) * parseInt(gamma, 2))
}

var fs = require('fs');
const rawInput = fs.readFileSync('3_1_input.txt').toString().split("\n");

const transposedInput = transposeData(rawInput);

getDeltaGammaCalc(transposedInput);