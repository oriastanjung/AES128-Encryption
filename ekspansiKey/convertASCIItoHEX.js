// langkah 1. merubah plaintext jadi array of matrix 4x4 hex
// Hello World >> 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21 20 20 20
/* menjadi urutan ke bawah atau vertical setiap 4 hex
    48 6F 6F 21
    65 2C 72 20
    6C 20 6C 20
    6C 57 64 20

    ini disebut round key away atau inital round key 0
*/

function charToHex(charInput) {
  return charInput.charCodeAt(0).toString(16).toUpperCase();
}

function stringToHexArray(inputString) {
  // Konversi string menjadi array karakter
  const charArray = inputString.split("");

  // Inisialisasi array 4x4
  const hexArray = [];
  for (let i = 0; i < 4; i++) {
    hexArray[i] = [];
    for (let j = 0; j < 4; j++) {
      // Ambil karakter dari array input
      const char = charArray[i + j * 4] || " "; // Ubah indeks
      // Konversi karakter menjadi kode hex dan tambahkan ke array
      hexArray[i][j] = charToHex(char);
    }
  }

  return hexArray;
}

// Contoh penggunaan
const inputString = "SMKHARAPANBANGSA";
const resultArray = stringToHexArray(inputString);
// console.log(resultArray);
// Tampilkan hasil
// for (let i = 0; i < 4; i++) {
//   console.log(resultArray[i].join(" "));
// }
// console.log(charToHex('H'))
module.exports = {
  stringToHexArray,
  charToHex,
};
