const getDepthIncreases = (input) => {
    let counter = 1;
    let previousItem;

    input.forEach(item => {
        if(previousItem && (item > previousItem)){
            counter++;
        }
        previousItem = item;
    })
    console.log(counter)
}

var fs = require('fs');
var input = fs.readFileSync('1_1_input.txt').toString().split("\n");

getDepthIncreases(input);