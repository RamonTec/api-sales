import * as CryptoJS from 'crypto-js';
import { ConfigService } from 'src/config/config.service';
export class Encrypt{
  constructor(
    private configService: ConfigService
  ){}
  
  hash(text: string): string {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const encyptation = {
        secret: process.env.ENCRYPTATION_SECRET,
        delimiter: process.env.ENCRYPTATION_DELIMITER
    }
    const claveBytes = CryptoJS.SHA256(encyptation.secret).toString(CryptoJS.enc.Base64);
    const saltBytes = salt.toString(CryptoJS.enc.Base64);
  
    const ciphertext = CryptoJS.AES.encrypt(text, claveBytes, {
      iv: salt,
      mode: CryptoJS.mode.CBC
    }).toString();
  
    const cypherText = `${ciphertext}${encyptation.delimiter}${saltBytes}`;
  
    return cypherText
  }

  compare(ciphertext: string, password: string): boolean {
    const encyptation = {
        secret: process.env.ENCRYPTATION_SECRET,
        delimiter: process.env.ENCRYPTATION_DELIMITER
    }
    const partes = ciphertext.split(encyptation.delimiter);
    const ciphertextBase64 = partes[0];
    const saltBase64 = partes[1];
  
    const claveBytes = CryptoJS.SHA256(encyptation.secret).toString(CryptoJS.enc.Base64);
    const saltBytes = CryptoJS.enc.Base64.parse(saltBase64);
  
    const bytes = CryptoJS.AES.decrypt(ciphertextBase64, claveBytes, {
      iv: saltBytes,
      mode: CryptoJS.mode.CBC
    });
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText === password;
  }

}