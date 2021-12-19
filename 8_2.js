var fs = require("fs");

const compareArrays = (array1, array2) => {
  return JSON.stringify(array1.sort()) === JSON.stringify(array2.sort());
};

const isSubset = (subset, superset) => {
  return compareCount(subset, superset) === subset.length;
};

const compareCount = (subset, superset) => {
  let count = 0;
  subset.forEach((s) => {
    if (superset.includes(s)) {
      count++;
    }
  });
  return count;
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

let tally = 0;

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

  // 0 matches 1 and not 4 and has 6 length
  const zeroPattern = patternAndInput.uniquePatterns.find((pattern) => {
    return (
      isSubset(onePattern, pattern) &&
      !isSubset(fourPattern, pattern) &&
      pattern.length === 6
    );
  });

  // 3 matches 1 and has 5 length
  const threePattern = patternAndInput.uniquePatterns.find((pattern) => {
    return isSubset(onePattern, pattern) && pattern.length === 5;
  });

  // 6 doesnt match 1 and has 6 length
  const sixPattern = patternAndInput.uniquePatterns.find((pattern) => {
    return !isSubset(onePattern, pattern) && pattern.length === 6;
  });

  // 9 matches 1 and 4 and has 6 length
  const ninePattern = patternAndInput.uniquePatterns.find((pattern) => {
    return (
      isSubset(onePattern, pattern) &&
      isSubset(fourPattern, pattern) &&
      pattern.length === 6
    );
  });

  // 2 doesn't match 3 or 9 and has 5 length
  const twoPattern = patternAndInput.uniquePatterns.find((pattern) => {
    return (
      !isSubset(threePattern, pattern) &&
      !isSubset(ninePattern, pattern) &&
      !isSubset(sixPattern, pattern) &&
      compareCount(pattern, sixPattern) === 4 &&
      pattern.length === 5
    );
  });

  // 5 doesn't match 3 but does match 9 and has 5 length
  const fivePattern = patternAndInput.uniquePatterns.find((pattern) => {
    return (
      pattern.length === 5 &&
      !compareArrays(twoPattern, pattern) &&
      !compareArrays(threePattern, pattern)
    );
  });

  let thisPatternTally = "";

  patternAndInput.outputValue.forEach((output) => {
    if (compareArrays(output, zeroPattern)) {
      thisPatternTally += "0";
    } else if (compareArrays(output, onePattern)) {
      thisPatternTally += "1";
    } else if (compareArrays(output, twoPattern)) {
      thisPatternTally += "2";
    } else if (compareArrays(output, threePattern)) {
      thisPatternTally += "3";
    } else if (compareArrays(output, fourPattern)) {
      thisPatternTally += "4";
    } else if (compareArrays(output, fivePattern)) {
      thisPatternTally += "5";
    } else if (compareArrays(output, sixPattern)) {
      thisPatternTally += "6";
    } else if (compareArrays(output, sevenPattern)) {
      thisPatternTally += "7";
    } else if (compareArrays(output, eightPattern)) {
      thisPatternTally += "8";
    } else if (compareArrays(output, ninePattern)) {
      thisPatternTally += "9";
    }
  });

  console.log(parseInt(thisPatternTally));

  tally += parseInt(thisPatternTally);
});

console.log(tally);
