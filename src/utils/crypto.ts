import CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';

const ivSize = 128; // 16
const iterations = 100000;
const iv = CryptoJS.lib.WordArray.random(ivSize / 8);

export const isBase64 = (value: string) => {
  try {
    return Buffer.from(value, 'base64').toString('base64') === value;
  } catch (e) {
    console.log('isBase64 error: ', e);

    return false;
  }
};

export default class CryptoUtils {
  static transmissionKey: string;
  static encryptKey: string;

  static sha1(msg: string) {
    return CryptoJS.SHA1(msg).toString().toUpperCase();
  }

  static hmac(msg: string, transmissionKey = this.transmissionKey) {
    const encrypted = CryptoJS.HmacSHA256(msg, transmissionKey);
    return encrypted.toString();
  }

  static encrypt(message: string, password = this.encryptKey) {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);

    const encrypted = CryptoJS.AES.encrypt(message, password, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
      hasher: CryptoJS.algo.SHA256,
    });

    // salt, iv will be hex 32 in length
    // append them to the ciphertext for use  in decryption
    const transitMessage =
      salt.toString() + iv.toString() + encrypted.toString();
    return transitMessage;
  }

  static decrypt(transitMessage: string, password = this.encryptKey) {
    const _iv = CryptoJS.enc.Hex.parse(transitMessage.substr(32, 32));
    const encrypted = transitMessage.substring(64);

    const decrypted = CryptoJS.AES.decrypt(encrypted, password, {
      iv: _iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
      hasher: CryptoJS.algo.SHA256,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  static pbkdf2Encrypt(masterPassword = this.encryptKey, secret: string) {
    const cipher = CryptoJS.PBKDF2(masterPassword, secret, {
      hasher: CryptoJS.algo.SHA256,
      keySize: 256 / 32,
      iterations,
    });

    return cipher.toString();
  }

  static sha256Encrypt(value: string) {
    return CryptoJS.SHA256(value).toString();
  }

  static aesEncrypt(value: string, key = this.transmissionKey) {
    return CryptoJS.AES.encrypt(value, key).toString();
  }

  static aesDecrypt(value: string, key = this.transmissionKey) {
    return CryptoJS.AES.decrypt(value, key).toString(CryptoJS.enc.Utf8);
  }

  static encryptFields(
    data: Record<string, string>,
    keyList: string[],
    encryptKey = this.encryptKey,
  ) {
    Object.keys(data).forEach(key => {
      if (data[key] && keyList.includes(key)) {
        data[key] = this.encrypt(data[key], encryptKey);
      }
    });
  }

  static decryptFields(
    data: Record<string, any>,
    keyList: string[],
    encryptKey = this.encryptKey,
  ) {
    Object.keys(data).forEach(key => {
      if (data[key] && keyList.includes(key)) {
        data[key] = this.decrypt(data[key], encryptKey);
      }
    });
  }

  static encryptItemPayload(
    data: Record<string, string>,
    transmissionKey = this.transmissionKey,
  ) {
    return {
      data: this.aesEncrypt(JSON.stringify(data), transmissionKey),
    };
  }

  static encryptPayload(
    data: Record<string, string>,
    keyList: string[] = [],
    encryptKey = this.encryptKey,
    transmissionKey = this.transmissionKey,
  ) {
    Object.keys(data).forEach(key => {
      if (keyList.includes(key.toLowerCase())) {
        data[key] = this.encrypt(data[key], encryptKey);
      }
    });

    return {
      data: this.aesEncrypt(JSON.stringify(data), transmissionKey),
    };
  }
}
