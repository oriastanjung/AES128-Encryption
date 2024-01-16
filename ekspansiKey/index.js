const { stringToHexArray } = require("./convertASCIItoHEX");
const { makeRoundKey } = require("./membuatRoundKey");

const inputText = "SMKHARAPANBANGSA";
const resultArray = stringToHexArray(inputText);
console.log(resultArray)
const round1 = makeRoundKey(resultArray);
const round2 = makeRoundKey(round1);
const round3 = makeRoundKey(round2);
console.log("roundkey 1 >> ", round1);
console.log("roundkey 2 >> ", round2);
console.log("roundkey 3 >> ", round3);
