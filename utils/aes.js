/**
 * Created by mazusheng on 2018/3/21.
 */
import aesjs from 'aes-js'
/**
 * aes-128 加密功能
 * @param key    array,16位数组
 * @param originData    string
 * @return cipherData    string
 */
export const cipher = (key,originData) => {
    try{
        let textBytes = aesjs.utils.utf8.toBytes(originData);
        let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        let encryptedBytes = aesCtr.encrypt(textBytes);
        let encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        return encryptedHex;
    }catch (e){
        return ''
    }
}

/**
 * aes-128 解密功能
 * @param key    array,16位数组
 * @param cipherData    string
 * @return cipherData    string
 */
export const decryption = (key,cipherData) => {
    try{
        var encryptedBytes = aesjs.utils.hex.toBytes(cipherData);
// The counter mode of operation maintains internal state, so to
// decrypt a new instance must be instantiated.
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);
// Convert our bytes back into text
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        return decryptedText;
    }catch (e){
        return ''
    }

}