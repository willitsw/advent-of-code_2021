const buildBoards = (rawBoards) => {
    const builtBoards = [];

    let builtBoard = [];
    for(let i = 0; i < rawBoards.length; i++){
        const rawRow= rawBoards[i];
        if(rawRow === ''){
            builtBoards.push(builtBoard);
            builtBoard = [];
            continue;
        }

        const parsedRow = rawRow.split(' ').filter(x => x !== '');
        const builtRow = [];
        parsedRow.forEach(cell => {
            builtRow.push({
                number: parseInt(cell),
                isMarked: false,
            });
        });
        builtBoard.push(builtRow);

        if(i === rawBoards.length - 1){
            builtBoards.push(builtBoard);
        }
    }

    return builtBoards;
}

const markBoards = (boards, draw) => {
    boards.forEach(board => {
        board.forEach(row => {
            row.forEach(cell => {
                if(cell.number === draw){
                    cell.isMarked = true;
                }
            })
        })
    })
}

const horizontalWin = (board) => {
    let returnValue = false
    board.forEach(row => {
        if(row.every(cell => cell.isMarked)){
            returnValue = true;
        }
    });
    return returnValue;
}

const verticalWin = (board) => {
    let returnValue = false
    for(let i = 0; i < board[0].length - 1; i++){
        const column = board.map(row => row[i]);
        if(column.every(cell => cell.isMarked)){
            returnValue = true;
        }
    }
    return returnValue;
}

const checkWinners = (boards) => {
    let winningBoard = undefined;
    boards.forEach(board => {
        if(horizontalWin(board)){
            winningBoard = board;
        }
        if(verticalWin(board)){
            winningBoard = board;
        }
    });

    return winningBoard;
}

const playBingo = (boards, drawOrder) => {
    for(let i = 0; i < drawOrder.length - 1; i++){
        const draw = drawOrder[i];
        markBoards(boards, draw);
        let winningBoard = checkWinners(boards);
        if(winningBoard){
            let unmarkedCount = 0;
            winningBoard.forEach(row => {
                row.forEach(currentCell => {
                    if(!currentCell.isMarked){
                        unmarkedCount += currentCell.number;
                    }
                })
            });

            console.log(unmarkedCount * draw);
            return;
        }
    };
}

var fs = require('fs');
const drawOrder = fs.readFileSync('4_draw_order.txt').toString().split("\n").map(d => parseInt(d));
const rawBoards = fs.readFileSync('4_boards.txt').toString().split("\n");

const boards = buildBoards(rawBoards);

playBingo(boards, drawOrder);