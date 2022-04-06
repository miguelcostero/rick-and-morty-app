import { Types } from 'mongoose';
import {
    generateSalt,
    hashPassword,
    generateToken as generateJwtToken,
} from './auth.helpers';

describe('Test generateSalt():', () => {
    it('should return a string', () => {
        expect(typeof generateSalt()).toBe('string');
    });

    it('should return a string with 32 characters', () => {
        expect(generateSalt().length).toBe(32);
    });
});

describe('Test hashPassword():', () => {
    it('should return a string', () => {
        expect(typeof hashPassword('', '')).toBe('string');
    });

    it('should return a string with 128 characters', () => {
        expect(hashPassword('', '').length).toBe(128);
    });
});

describe('Test generateJwtToken():', () => {
    beforeAll(() => {
        process.env.JWT_SECRET = 'secret';
    });

    it('should return a string', () => {
        expect(typeof generateJwtToken(new Types.ObjectId().toString())).toBe(
            'string',
        );
    });

    it('should return a string with 176 characters', () => {
        expect(generateJwtToken(new Types.ObjectId().toString()).length).toBe(
            176,
        );
    });
});
