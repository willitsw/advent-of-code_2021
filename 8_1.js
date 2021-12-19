var fs = require("fs");

const compareArrays = (array1, array2) => {
  return JSON.stringify(array1.sort()) === JSON.stringify(array2.sort());
};

const rawInput = fs.readFileSync("8_data.txt").toString().split("\n");
const uniquePatternAndInputs = rawInput.map((line) => {
  const splitLine = line.split(" | ");
  const uniquePatternStrings = splitLine[0].split(" ");
  const outputValueStrings = splitLine[1].split(" ");
  return {
    uniquePatterns: uniquePatternStrings.map((string) => string.split("")),
    outputValue: outputValueStrings.map((string) => string.split("")),
  };
});

let totalCount = 0;

uniquePatternAndInputs.forEach((patternAndInput) => {
  const onePattern = patternAndInput.uniquePatterns.find(
    (pattern) => pattern.length === 2
  );
  const fourPattern = patternAndInput.uniquePatterns.find(
    (pattern) => pattern.length === 4
  );
  const sevenPattern = patternAndInput.uniquePatterns.find(
    (pattern) => pattern.length === 3
  );
  const eightPattern = patternAndInput.uniquePatterns.find(
    (pattern) => pattern.length === 7
  );

  const count = patternAndInput.outputValue.filter((value) => {
    if (
      compareArrays(value, onePattern) ||
      compareArrays(value, fourPattern) ||
      compareArrays(value, sevenPattern) ||
      compareArrays(value, eightPattern)
    ) {
      return value;
    }
  }).length;

  totalCount += count;
});

console.log(totalCount);
