const processDay = (fishCounter, day) => {
  return {
    day0: fishCounter.day1,
    day1: fishCounter.day2,
    day2: fishCounter.day3,
    day3: fishCounter.day4,
    day4: fishCounter.day5,
    day5: fishCounter.day6,
    day6: fishCounter.day7 + fishCounter.day0,
    day7: fishCounter.day8,
    day8: fishCounter.day0,
  };
};

var fs = require("fs");
const firstFishes = fs
  .readFileSync("6_data.txt")
  .toString()
  .split(",")
  .map((fish) => [parseInt(fish)]);

let fishCounter = {
  day0: 0,
  day1: 0,
  day2: 0,
  day3: 0,
  day4: 0,
  day5: 0,
  day6: 0,
  day7: 0,
  day8: 0,
};

firstFishes.forEach((fish) => {
  switch (fish[0]) {
    case 0:
      fishCounter.day0++;
      break;
    case 1:
      fishCounter.day1++;
      break;
    case 2:
      fishCounter.day2++;
      break;
    case 3:
      fishCounter.day3++;
      break;
    case 4:
      fishCounter.day4++;
      break;
    case 5:
      fishCounter.day5++;
      break;
    case 6:
      fishCounter.day6++;
      break;
    case 7:
      fishCounter.day7++;
      break;
    case 8:
      fishCounter.day8++;
      break;
    default:
      throw Error("uh oh");
  }
});

const days = 256;

for (let day = 1; day <= days; day++) {
  fishCounter = processDay(fishCounter, day);
  const count =
    fishCounter.day0 +
    fishCounter.day1 +
    fishCounter.day2 +
    fishCounter.day3 +
    fishCounter.day4 +
    fishCounter.day5 +
    fishCounter.day6 +
    fishCounter.day7 +
    fishCounter.day8;

  console.log(`after day ${day}: ${count}`);
}
