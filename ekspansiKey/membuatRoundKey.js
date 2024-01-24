const { charToHex } = require("./convertASCIItoHEX");
const { rotWord } = require("./rotWord");
const { sboxOneDimensionalArray } = require("./sBoxSubtitusion");
const { tekeColumnArrayAs1D } = require("./takeColumnArrayAS1D");
const inputArray = [
  ["53", "41", "41", "4E"],
  ["4D", "52", "4E", "47"],
  ["4B", "41", "42", "53"],
  ["48", "50", "41", "41"],
];

function hexXOR(hex1, hex2) {
  const int1 = parseInt(hex1, 16);
  const int2 = parseInt(hex2, 16);
  const resultInt = int1 ^ int2;
  const resultHex = resultInt
    .toString(16)
    .toUpperCase()
    .padStart(hex1.length, "0");
  return resultHex;
}

function makeRoundKey(inputARR, rconKe = 0) {
  // jika pertama kali kolomnya, maka diterapkan XOR dengan Round Constant (RCon) dari hasil ROTWORD yang telah di SBox kan
  const RCON = [
    ["01", "00", "00", "00"],
    ["02", "00", "00", "00"],
    ["04", "00", "00", "00"],
    ["08", "00", "00", "00"],
    ["10", "00", "00", "00"],
    ["20", "00", "00", "00"],
    ["40", "00", "00", "00"],
    ["80", "00", "00", "00"],
    ["1B", "00", "00", "00"],
    ["36", "00", "00", "00"],
  ];

  const lastColumnRotWord = rotWord(inputARR, 4);
  const lastColumnRotWordSBox = sboxOneDimensionalArray(lastColumnRotWord);
  // console.log(tekeColumnArrayAs1D(inputARR,1))

  let wi_4 = tekeColumnArrayAs1D(inputARR, 1);
  // console.log("wi_4 >> ", wi_4);
  let wi = [];
  // khusus colom 1 kita perlu Rcon
  for (let i = 0; i < 4; i++) {
    const hexXORInit = hexXOR(wi_4[i], lastColumnRotWordSBox[i]);
    wi[i] = hexXOR(hexXORInit, RCON[rconKe][i]);
  }

  const kolom1 = [...wi];
  // console.log("colom 1>>", kolom1);

  // colom 2
  for (let i = 0; i < 4; i++) {
    const selectKolomInputArray2 = tekeColumnArrayAs1D(inputARR, 2);
    const result = hexXOR(kolom1[i], selectKolomInputArray2[i]);
    wi[i] = result;
  }
  const kolom2 = [...wi];
  // console.log("colom 2>>", kolom2);

  // colom 3
  for (let i = 0; i < 4; i++) {
    const selectKolomInputArray3 = tekeColumnArrayAs1D(inputARR, 3);
    const result = hexXOR(kolom2[i], selectKolomInputArray3[i]);
    wi[i] = result;
  }
  const kolom3 = [...wi];
  // console.log("colom 3>>", kolom3);

  // colom 3
  for (let i = 0; i < 4; i++) {
    const selectKolomInputArray4 = tekeColumnArrayAs1D(inputARR, 4);
    const result = hexXOR(kolom3[i], selectKolomInputArray4[i]);
    wi[i] = result;
  }
  const kolom4 = [...wi];
  // console.log("colom 4>>", kolom4);

  let output = [
    [kolom1[0], kolom2[0], kolom3[0], kolom4[0]],
    [kolom1[1], kolom2[1], kolom3[1], kolom4[1]],
    [kolom1[2], kolom2[2], kolom3[2], kolom4[2]],
    [kolom1[3], kolom2[3], kolom3[3], kolom4[3]],
  ];

  return output;
}
const round1 = makeRoundKey(inputArray);
const round2 = makeRoundKey(round1);
const round3 = makeRoundKey(round2);
// console.log("roundkey 1 >> ", round1)
// console.log("roundkey 2 >> ", round2)
// console.log("roundkey 3 >> ", round3)

module.exports = {
  makeRoundKey,
  hexXOR,
};
