const CryptoJS = require("crypto-js");

// var text = 'CINDY TRI ANTIKA';
// var kunci = 'SMKHARAPANBANGSA';

// var text = 'INFORMATIKA HORE';
const data = { nama: "oriastanjung", nik: 201259021951 };
let text = JSON.stringify(data);
var kunci = "FTTKUMRAHBERJAYA";
let key = "";

console.log("text:", text);
console.log("key:", kunci);
console.log("key length:", kunci.length);

// Fix: Use the Utf8 encoder
text = CryptoJS.enc.Utf8.parse(text);

// Fix: Truncate or pad the key to the correct length (16 bytes for AES-128)
key = CryptoJS.enc.Utf8.parse(kunci.substring(0, 16));

// Fix: Apply padding (e.g., Zero padding). Note that PKCS#7 padding is more reliable and that ECB is insecure
var encrypted = CryptoJS.AES.encrypt(text, key, {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.ZeroPadding,
});
encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
console.log("encrypted", encrypted);

// Fix: Pass a CipherParams object (or the Base64 encoded ciphertext)
var decrypted = CryptoJS.AES.decrypt(
  { ciphertext: CryptoJS.enc.Hex.parse(encrypted) },
  key,
  { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding }
);

var decryptData = JSON.parse(CryptoJS.enc.Utf8.stringify(decrypted));
// Fix: Use Hex encoding to convert the decrypted data from hexadecimal
console.log("decrypted", CryptoJS.enc.Utf8.stringify(decrypted));
console.log("decrypted", decryptData);
