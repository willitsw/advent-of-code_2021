const getDepthIncreases = (input) => {
    let counter = 0;

    input.forEach((item, index) => {
        const firstSum = getDepthSum(index, index + 2, input);
        const secondSum = getDepthSum(index + 1, index + 3, input);
        if(firstSum < secondSum){
            counter++;
        }
    })
    console.log(counter)
}

const getDepthSum = (beginningIndex, endingIndex, array) => {
    if(beginningIndex < 0 || endingIndex > (array.length - 1)){
        return 0;
    }
    let currentIndex = beginningIndex;
    let sum = 0;
    while(currentIndex <= endingIndex){
        sum += parseInt(array[currentIndex]);
        currentIndex++;
    }
    return sum;
}

var fs = require('fs');
var input = fs.readFileSync('1_1_input.txt').toString().split("\n");

getDepthIncreases(input);