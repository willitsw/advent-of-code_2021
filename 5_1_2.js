const buildMatrix = () => {
    const matrixSize = 1000;
    const matrix = [];
    for(let i = 0; i < matrixSize; i++){
        const row = [];
        for(let x = 0; x < matrixSize; x++){
            row.push(0);
        }
        matrix.push(row);
    }
    return matrix;
}

const getPoints = (input) => {
    const points = [];
    input.forEach((line, index) => {
        const lineNumber = index + 1;
        let [rawStart, rawEnd] = line.split(' -> ')

        rawStart = rawStart.split(',')
        const start = {
            row: parseInt(rawStart[0]),
            column: parseInt(rawStart[1]),
        }

        rawEnd = rawEnd.split(',')
        const end = {
            row: parseInt(rawEnd[0]),
            column: parseInt(rawEnd[1]),
        }

        let incrementer;
        if(start.row === end.row){ // it is horizontal
            incrementer = start.column;
            if (incrementer > end.column){
                while(incrementer >= end.column){
                    // if(incrementer === start.column){
                    //     console.log(`line ${lineNumber}: first is ${start.row}, ${incrementer}`)
                    // }
                    // if(incrementer === end.column){
                    //     console.log(`line ${lineNumber}: last is ${start.row}, ${incrementer}`)
                    // }
                    points.push({
                        row: start.row,
                        column: incrementer,
                    });
                    incrementer--;
                }
            } else {
                while(incrementer <= end.column){
                    // if(incrementer === start.column){
                    //     console.log(`line ${lineNumber}: first is ${start.row}, ${incrementer}`)
                    // }
                    // if(incrementer === end.column){
                    //     console.log(`line ${lineNumber}: last is ${start.row}, ${incrementer}`)
                    // }
                    points.push({
                        row: start.row,
                        column: incrementer,
                    });
                    incrementer++;
                }
            }
            
        } else if (start.column === end.column){ // it is vertical
            incrementer = start.row;
            if (incrementer > end.row){
                while(incrementer >= end.row){
                    // if(incrementer === start.row){
                    //     console.log(`line ${lineNumber}: first is ${incrementer}, ${start.column}`)
                    // }
                    // if(incrementer === end.row){
                    //     console.log(`line ${lineNumber}: last is ${incrementer}, ${end.column}`)
                    // }
                    points.push({
                        row: incrementer,
                        column: start.column,
                    });
                    incrementer--;
                }
            } else {
                while(incrementer <= end.row){
                    // if(incrementer === start.row){
                    //     console.log(`line ${lineNumber}: first is ${incrementer}, ${start.column}`)
                    // }
                    // if(incrementer === end.row){
                    //     console.log(`line ${lineNumber}: last is ${incrementer}, ${end.column}`)
                    // }
                    points.push({
                        row: incrementer,
                        column: start.column,
                    });
                    incrementer++;
                }
            }
            
        } else {
            console.log(`line ${lineNumber} is diagonal. start: ${rawStart}, end: ${rawEnd}`)
            // its diagonal
            let rowIncrementer = start.row;
            let columnIncrementer = start.column;

            // going up and right
            if(start.row < end.row && start.column < end.column){
                while(rowIncrementer <= end.row){
                    if(rowIncrementer === start.row){
                        console.log(`line ${lineNumber}: first is ${rowIncrementer}, ${columnIncrementer}`)
                    }
                    if(rowIncrementer === end.row){
                        console.log(`line ${lineNumber}: last is ${rowIncrementer}, ${columnIncrementer}`)
                    }
                    points.push({
                        row: rowIncrementer,
                        column: columnIncrementer,
                    })
                    rowIncrementer++;
                    columnIncrementer++;
                }
            }

            // going up and left
            if(start.row < end.row && start.column > end.column){
                while(rowIncrementer <= end.row){
                    if(rowIncrementer === start.row){
                        console.log(`line ${lineNumber}: first is ${rowIncrementer}, ${columnIncrementer}`)
                    }
                    if(rowIncrementer === end.row){
                        console.log(`line ${lineNumber}: last is ${rowIncrementer}, ${columnIncrementer}`)
                    }
                    points.push({
                        row: rowIncrementer,
                        column: columnIncrementer,
                    })
                    rowIncrementer++;
                    columnIncrementer--;
                }
            }

            // going down and left
            if(start.row > end.row && start.column > end.column){
                while(rowIncrementer >= end.row){
                    if(rowIncrementer === start.row){
                        console.log(`line ${lineNumber}: first is ${rowIncrementer}, ${columnIncrementer}`)
                    }
                    if(rowIncrementer === end.row){
                        console.log(`line ${lineNumber}: last is ${rowIncrementer}, ${columnIncrementer}`)
                    }
                    points.push({
                        row: rowIncrementer,
                        column: columnIncrementer,
                    })
                    rowIncrementer--;
                    columnIncrementer--;
                }
            }

            // going down and right
            if(start.row > end.row && start.column < end.column){
                while(rowIncrementer >= end.row){
                    if(rowIncrementer === start.row){
                        console.log(`line ${lineNumber}: first is ${rowIncrementer}, ${columnIncrementer}`)
                    }
                    if(rowIncrementer === end.row){
                        console.log(`line ${lineNumber}: last is ${rowIncrementer}, ${columnIncrementer}`)
                    }
                    points.push({
                        row: rowIncrementer,
                        column: columnIncrementer,
                    })
                    rowIncrementer--;
                    columnIncrementer++;
                }
            }
        }
    })

    return points;
}

const addPointsToMatrix = (points, matrix) => {
    points.forEach(point => {
        matrix[point.row][point.column]++;
    })
}

const countMultipleOccurences = (matrix) => {
    let multipleOccurences = 0;

    matrix.forEach(row => {
        multipleOccurences += row.filter(cell => cell > 1).length;
    })

    console.log(multipleOccurences)
}

var fs = require('fs');
const rawInput = fs.readFileSync('5.txt').toString().split("\n");

const points = getPoints(rawInput);
const matrix = buildMatrix(rawInput);
addPointsToMatrix(points, matrix);
countMultipleOccurences(matrix);