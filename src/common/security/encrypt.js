import { DECRYPT_KEY, ECRYPT_KEY } from "../../config/config.js";
import CryptoJS from "crypto-js"
export async function encryptValue({ value, ecryptKey = ECRYPT_KEY  }) {
  return CryptoJS.AES.encrypt(value, ecryptKey).toString();
}



export async function decryptValue({ ciphertext, decryptKey = DECRYPT_KEY}) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, decryptKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
