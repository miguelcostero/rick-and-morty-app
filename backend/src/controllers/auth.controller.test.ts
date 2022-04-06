import request from 'supertest';
import { Express } from 'express';
import { getServer } from '../utils/test.server';

describe('Test authController.login', () => {
    let server: Express;

    beforeAll(async () => {
        server = await getServer();
        process.env.NODE_ENV = 'test';
    });

    it('should return a token when logging in', async () => {
        const res = await request(server).post('/auth/login').send({
            email: 'miguel@test.com',
            password: 'test',
        });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
        expect(res.body.user).toBeDefined();
    });

    it('should return an error when logging in with an invalid email', async () => {
        const res = await request(server).post('/auth/login').send({
            email: 'test',
            password: 'test',
        });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });

    it('should return an error when logging in with an invalid password', async () => {
        const res = await request(server).post('/auth/login').send({
            email: 'miguel@test.com',
            password: 'wrongPassword1',
        });
        expect(res.status).toBe(401);
        expect(res.body.error).toBeDefined();
    });

    it('should return an error when logging in with an invalid email and password', async () => {
        const res = await request(server).post('/auth/login').send({
            email: 'test',
            password: 'wrongPassword1',
        });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });
});

describe('Test authController.signup', () => {
    let server: Express;

    beforeAll(async () => {
        server = await getServer();
        process.env.NODE_ENV = 'test';
    });

    it('should return a token when signing up', async () => {
        const res = await request(server).post('/auth/signup').send({
            email: 'test@test.com',
            password: 'test',
            repeatPassword: 'test',
            firstName: 'Test',
            lastName: 'Test',
        });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
        expect(res.body.user).toBeDefined();
    });

    it('it should return an error when signing up with mismatching passwords', async () => {
        const res = await request(server).post('/auth/signup').send({
            email: 'test@test.com',
            password: 'test',
            repeatPassword: 'wrongPassword',
            firstName: 'Test',
            lastName: 'Test',
        });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });

    it('should return an error when signing up with an invalid email', async () => {
        const res = await request(server).post('/auth/signup').send({
            email: 'test',
            password: 'test',
            repeatPassword: 'test',
            firstName: 'Test',
            lastName: 'Test',
        });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });

    it('should return an error when signing up with an invalid password', async () => {
        const res = await request(server).post('/auth/signup').send({
            email: 'test@test.com',
            password: 'test',
            repeatPassword: 'test',
            firstName: 'Test',
            lastName: 'Test',
        });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });

    it('should return an error when signing up with an invalid email and password', async () => {
        const res = await request(server).post('/auth/signup').send({
            email: 'test',
            password: 'test',
            repeatPassword: 'test',
            firstName: 'Test',
            lastName: 'Test',
        });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });

    it('should return an error when signing up with an existing email', async () => {
        const res = await request(server).post('/auth/signup').send({
            email: 'miguel@test.com',
            password: 'test',
            repeatPassword: 'test',
            firstName: 'Test',
            lastName: 'Test',
        });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });

    it('should return an error when signing up with an invalid firstName', async () => {
        const res = await request(server).post('/auth/signup').send({
            email: 'test@test.com',
            password: 'test',
            repeatPassword: 'test',
            firstName: '',
            lastName: 'Test',
        });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });

    it('should return an error when signing up with an invalid lastName', async () => {
        const res = await request(server).post('/auth/signup').send({
            email: 'test@test.com',
            password: 'test',
            repeatPassword: 'test',
            firstName: 'Test',
            lastName: '',
        });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });

    it('should return an error when signing up with an invalid firstName and lastName', async () => {
        const res = await request(server).post('/auth/signup').send({
            email: 'test@test.com',
            password: 'test',
            repeatPassword: 'test',
            firstName: '',
            lastName: '',
        });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });
});
