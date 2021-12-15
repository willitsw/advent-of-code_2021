var fs = require("fs");
const crabSubs = fs
  .readFileSync("7_data.txt")
  .toString()
  .split(",")
  .map((sub) => parseInt(sub));

let lowest;

for (let i = 0; i < 10000; i++) {
  const gasTally = crabSubs.reduce((counter, currentSub) => {
    let gasExpense = 0;
    if (currentSub < i) {
      gasExpense += i - currentSub;
    } else if (currentSub > i) {
      gasExpense += currentSub - i;
    }

    return counter + gasExpense;
  }, 0);

  if (!lowest || gasTally < lowest.tally) {
    lowest = {
      position: i,
      tally: gasTally,
    };
  }
}

console.log(lowest);
