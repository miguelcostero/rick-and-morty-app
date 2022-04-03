import jsonwebtoken from 'jsonwebtoken';
import { randomBytes, pbkdf2Sync } from 'crypto';
import environment from '../environment';

export const generateSalt = (): string => {
    return randomBytes(16).toString('hex');
};

export const hashPassword = (salt: string, password: string): string => {
    return pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
};

export const generateToken = (userId: string): string => {
    return jsonwebtoken.sign({ userId }, environment.jwtSecret, {
        expiresIn: '1d',
    });
};
