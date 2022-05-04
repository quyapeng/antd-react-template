import { AES_KEY } from '@/constant';

const CryptoJS = require('crypto-js');

export const encryptByAes = (sourceValue: string, key = AES_KEY): string => {
  return CryptoJS.AES.encrypt(sourceValue, key).toString();
};

export const decryptByAes = (encryptValue: string, key = AES_KEY): string => {
  const bytes = CryptoJS.AES.decrypt(encryptValue, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};
