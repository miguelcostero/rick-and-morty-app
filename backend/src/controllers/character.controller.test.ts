import request, { SuperTest } from 'supertest';
import { Express } from 'express';
import { getServer } from '../utils/test.server';

describe('describe getCharacters', () => {
    let server: Express;
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VySWQiOiI2MjRiMmM3NjA2NDE5MjcyNDExZTA1MWYifQ.Z_XBkLv-Nvxte90UStbMVB8-P-R02V__XZJ-4rSc25A';

    beforeAll(async () => {
        server = await getServer();
        process.env.NODE_ENV = 'test';
    });

    it('should return all characters', async () => {
        const res = await request(server)
            .get('/character')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.pageNumber).toBeDefined();
        expect(res.body.total).toBeDefined();
        expect(res.body.data).toBeDefined();
    });
});
