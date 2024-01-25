const { stringToHexArray } = require("./ekspansiKey/convertASCIItoHEX");
const { hexXOR } = require("./ekspansiKey/membuatRoundKey");
const { subBytes } = require("./ekspansiKey/sBoxSubtitusion");
const { round1, round2, round3, round4, round5, round6, round7, round8, round9 } = require("./ekspansiKey");

const plainText = "INFORMATIKA HORE";
const arrayHex = stringToHexArray(plainText);
console.log("plain text hex >> ", arrayHex);

const key = "FTTKUMRAHBERJAYA";
const keyHexArray = stringToHexArray(key);
console.log("key hex >> ", keyHexArray);

// 1. Menambahkan XOR plaintext dengan round key 0
function xorMatrices(matrix1, matrix2) {
  if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
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

// 2. Menambahkan round key 0
const hasilAddRoundKey = xorMatrices(arrayHex, keyHexArray);
console.log("hasil addRoundKey >> ", hasilAddRoundKey);

// 3. SubBytes
const hasilSubBytes = subBytes(hasilAddRoundKey);
console.log("hasil subBytes >> ", hasilSubBytes);

// 4. ShiftRow
function shiftRow(matrix) {
  return [
    matrix[0],
    [matrix[1][1], matrix[1][2], matrix[1][3], matrix[1][0]],
    [matrix[2][2], matrix[2][3], matrix[2][0], matrix[2][1]],
    [matrix[3][3], matrix[3][0], matrix[3][1], matrix[3][2]]
  ];
}
const hasilShiftRow = shiftRow(hasilSubBytes);
console.log("hasil shiftRow >> ", hasilShiftRow);

// 5. MixColumns
const R_GALOIS_FIELD_MATRIX = [
  ["02", "03", "01", "01"],
  ["01", "02", "03", "01"],
  ["01", "01", "02", "03"],
  ["03", "01", "01", "02"]
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
      result[i][j] = 0; // Inisialisasi dengan 0 untuk hasil akhir
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
const roundKeys = [
  round1,
  round2,
  round3,
  round4,
  round5,
  round6,
  round7,
  round8,
  round9,
];
// 6. MultiplyColumns
const hasilMultiplyColumns = mixColumns(hasilShiftRow);
console.log("hasil multiplyColumns >> ", hasilMultiplyColumns);

// 7. AddRoundKey untuk ronde 1
const hasilRonde1 = xorMatrices(hasilMultiplyColumns, round1);
console.log("hasil ronde 1 >> ", hasilRonde1);

// 8. Fungsi untuk melakukan ronde
function hasilRonde(inputMatrix, rondeKe) {
  const setelahSubBytes = subBytes([...inputMatrix]);
  console.log(setelahSubBytes, "--<<<")
  const setelahShiftRow = shiftRow(setelahSubBytes);
  const setelahMixColumn = mixColumns(setelahShiftRow);
  return xorMatrices(setelahMixColumn, roundKeys[rondeKe - 1]);
}

// Contoh penggunaan hasilRonde untuk setiap ronde
let stateMatrix = hasilMultiplyColumns;
for (let rondeKe = 1; rondeKe <= 9; rondeKe++) {
  stateMatrix = hasilRonde([...stateMatrix], rondeKe);
  console.log(`hasil ronde ${rondeKe} >> `, stateMatrix);
}
