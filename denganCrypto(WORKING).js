var CryptoJS = require("crypto-js");

// Fungsi untuk mengonversi string ke dalam bentuk hex
function stringToHex(input) {
  return CryptoJS.enc.Utf8.parse(input).toString(CryptoJS.enc.Hex);
}

// Buat kunci AES 128 bit dari string
const inputKey = "SMKHARAPANBANGSA";
var keyHex = stringToHex(inputKey);
var key = CryptoJS.enc.Hex.parse(keyHex);

// Pilih mode operasi dan padding
var mode = CryptoJS.mode.ECB;

// Buat objek parameter untuk konfigurasi enkripsi/dekripsi
var params = { mode: mode };

// Enkripsi teks ke dalam bentuk hex
const data = "CINDY TRI ANTIKA"
var plaintext = JSON.stringify(data);
console.log(plaintext)
var encrypted = CryptoJS.AES.encrypt(plaintext, key, params);
var encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
console.log('Cipher Text (Hex):', encryptedHex);

// Dekripsi dari bentuk hex
var ciphertext = CryptoJS.enc.Hex.parse(encryptedHex);
var decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key, params);
console.log('Decrypted Text:', decrypted.toString(CryptoJS.enc.Utf8));
