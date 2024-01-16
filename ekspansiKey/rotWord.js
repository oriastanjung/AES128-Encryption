// 2. menerapkan RotWord atau rottate word dari urutan bawah ke atas 1 posisi

const { sboxOneDimensionalArray } = require("./sBoxSubtitusion");

function rotWord(inputArray, indexPos) {
  const rotatedArray = [
    inputArray[1][indexPos - 1],
    inputArray[2][indexPos - 1],
    inputArray[3][indexPos - 1],
    inputArray[0][indexPos - 1],
  ];

  return rotatedArray;
}

// Contoh penggunaan
const inputArray = [
    [ '53', '41', '41', '4E' ],
    [ '4D', '52', '4E', '47' ],
    [ '4B', '41', '42', '53' ],
    [ '48', '50', '41', '41' ]
  ];

// console.log(inputArray);
// console.log("rotWord > ", rotWord(inputArray, 4));

// // 3. proses substitusi rotWord dengan SBOX
// console.log(
//   "rotWord + sbox > ",
//   sboxOneDimensionalArray(rotWord(inputArray, 4))
// );

module.exports ={
    rotWord
}