// utils/encryption.ts
import { AES, enc } from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || 'fallback-secret-key'; // Keep this in .env for security

export function encrypt(data: any): string {
    try {
        return AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    } catch (error) {
        console.error('Error encrypting data', error);
        throw new Error('Encryption failed');
    }
}

export function decrypt(ciphertext: string): any {
    try {
        const bytes = AES.decrypt(ciphertext, SECRET_KEY);
        return JSON.parse(bytes.toString(enc.Utf8));
    } catch (error) {
        console.error('Error decrypting data', error);
        throw new Error('Decryption failed');
    }
}
