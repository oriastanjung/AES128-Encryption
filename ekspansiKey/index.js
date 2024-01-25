const { stringToHexArray } = require("./convertASCIItoHEX");
const { makeRoundKey } = require("./membuatRoundKey");

const inputText = "FTTKUMRAHBERJAYA";
const resultArray = stringToHexArray(inputText);
// console.log(resultArray)
const round1 = makeRoundKey(resultArray);
const round2 = makeRoundKey(round1,1);
const round3 = makeRoundKey(round2,2);
const round4 = makeRoundKey(round3,3);    
const round5 = makeRoundKey(round4,4);
const round6 = makeRoundKey(round5,5);
const round7 = makeRoundKey(round6,6);
const round8 = makeRoundKey(round7,7);
const round9 = makeRoundKey(round8,8);
const round10 = makeRoundKey(round9,9);
// const round10 = makeRoundKey(round9);
// console.log("roundkey 0 >> ", round0);
console.log("roundkey 1 >> ", round1);
console.log("roundkey 2 >> ", round2);
console.log("roundkey 3 >> ", round3);
console.log("roundkey 4 >> ", round4);
console.log("roundkey 5 >> ", round5);
console.log("roundkey 6 >> ", round6);
console.log("roundkey 7 >> ", round7);
console.log("roundkey 8 >> ", round8);
console.log("roundkey 9 >> ", round9);
// console.log("roundkey 10 >> ", round10);



module.exports = {
    round1,
    round2,
    round3,
    round4,
    round5,
    round6,
    round7,
    round8,
    round9,
    round10,
}