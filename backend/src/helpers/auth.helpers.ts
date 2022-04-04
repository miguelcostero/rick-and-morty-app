import jsonwebtoken from 'jsonwebtoken';
import { randomBytes, pbkdf2Sync } from 'crypto';

export const generateSalt = (): string => {
    return randomBytes(16).toString('hex');
};

export const hashPassword = (salt: string, password: string): string => {
    return pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
};

export const generateToken = (userId: string): string => {
    return jsonwebtoken.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: '1d',
    });
};
