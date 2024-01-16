const { stringToHexArray } = require("./ekspansiKey/convertASCIItoHEX");
const { hexXOR } = require("./ekspansiKey/membuatRoundKey");
const { subBytes } = require("./ekspansiKey/sBoxSubtitusion");

const plainText = "CINDY TRI ANTIKA";
const arrayHex = stringToHexArray(plainText);

const key = "SMKHARAPANBANGSA";
const keyHexArray = stringToHexArray(key);

// 1. menambahkan XOR plaintext dengan roundkey 0
function xorMatrices(matrix1, matrix2) {
  if (
    matrix1.length !== matrix2.length ||
    matrix1[0].length !== matrix2[0].length
  ) {
    throw new Error("Matriks harus memiliki dimensi yang sama");
  }

  const result = [];
  for (let i = 0; i < matrix1.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrix1[i].length; j++) {
      result[i][j] = hexXOR(matrix1[i][j], matrix2[i][j]);
    }
  }

  return result;
}
//2
const hasilAddRoundKey = xorMatrices(arrayHex, keyHexArray);
console.log("hasil addRoundKey >> ", hasilAddRoundKey);
//3
const hasilSubBytes = subBytes(hasilAddRoundKey);
console.log("hasil subBytes >> ", hasilSubBytes);

function shiftRow(matrix) {
  const row1 = matrix[0];
  const row2 = [matrix[1][1], matrix[1][2], matrix[1][3], matrix[1][0]];
  const row3 = [matrix[2][2], matrix[2][3], matrix[2][0], matrix[2][1]];
  const row4 = [matrix[3][3], matrix[3][0], matrix[3][1], matrix[3][2]];

  return [row1, row2, row3, row4];
}
//4
const hasilShiftRow = shiftRow(hasilSubBytes);
console.log("hasil hasilShiftRow >> ", hasilShiftRow);




//5 tahap mixColumns

const R_GALOIS_FIELD_MATRIX = [
  ["02", "03", "01", "01"],
  ["01", "02", "03", "01"],
  ["01", "01", "02", "03"],
  ["03", "01", "01", "02"],
];

function galoisMultiply(a, b) {
  let result = 0;
  let mask = 0x80; // 0b10000000

  for (let i = 0; i < 8; i++) {
    if ((b & 1) === 1) {
      result ^= a;
    }

    const carry = a & mask;
    a <<= 1;

    if (carry !== 0) {
      a ^= 0x1b; // XOR dengan 0x1B jika carry terjadi
    }

    b >>= 1;
  }

  return result;
}

function mixColumns(state) {
  const result = [];

  for (let i = 0; i < 4; i++) {
    result[i] = [];
    for (let j = 0; j < 4; j++) {
      result[i][j] = "00"; // Inisialisasi dengan "00" untuk hasil akhir
      for (let k = 0; k < 4; k++) {
        const stateValue = parseInt(state[k][j], 16);
        const galoisValue = parseInt(R_GALOIS_FIELD_MATRIX[i][k], 16);
        result[i][j] ^= galoisMultiply(stateValue, galoisValue) % 256;
      }
      result[i][j] = result[i][j].toString(16).toUpperCase().padStart(2, "0");
    }
  }

  return result;
}

// Contoh penggunaan:
//   const state = [
//     ["D4", "E0", "B8", "1E"],
//     ["BF", "B4", "41", "27"],
//     ["5D", "52", "11", "98"],
//     ["30", "AE", "F1", "E5"],
//   ];

const hasilMultiplyColumns = mixColumns(hasilShiftRow);
console.log("hasil hasilMultiplyColumns >> ", hasilMultiplyColumns);


//6. tahap menambahkan hasil mixColumn dengan roundkey 1