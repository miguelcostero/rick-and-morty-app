import request from 'supertest';
import { Express } from 'express';
import { getServer } from '../utils/test.server';

describe('test user.controller', () => {
    let server: Express;
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VySWQiOiI2MjRiMmM3NjA2NDE5MjcyNDExZTA1MWYifQ.Z_XBkLv-Nvxte90UStbMVB8-P-R02V__XZJ-4rSc25A';

    beforeAll(async () => {
        server = await getServer();
        process.env.NODE_ENV = 'test';
    });

    it('should return user document', async () => {
        const res = await request(server)
            .get('/user/me')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body._id).toBeDefined();
        expect(res.body.email).toBe('miguel@test.com');
    });

    it('should return an error if token is not given', async () => {
        const res = await request(server).get('/user/me');
        expect(res.status).toBe(401);
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toBe('Unauthorized');
    });

    it('should return an error if token is invalid', async () => {
        const res = await request(server).get('/user/me').set('Authorization', 'Bearer invalidToken');
        expect(res.status).toBe(401);
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toBe('Invalid token');
    });
});
