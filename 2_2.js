const calculateSubMovement = (movements) => {
    let forwardDistance = 0;
    let verticalDistance = 0;
    let aim = 0;

    movements.forEach(movement => {
        switch(movement.type){
            case 'up':
                aim -= movement.distance;
                break;
            case 'down':
                aim += movement.distance;
                break;
            case 'forward':
                verticalDistance += (aim * movement.distance);
                forwardDistance += movement.distance;
                break;
            default:
                break;
        }
    })
    
    console.log(forwardDistance * verticalDistance);
}

var fs = require('fs');
const rawInput = fs.readFileSync('2_1_input.txt').toString().split("\n");
const movements = [];
rawInput.forEach(item => {
    const parts = item.split(' ');
    movements.push({
        type: parts[0],
        distance: parseInt(parts[1]),
    })
});

calculateSubMovement(movements);