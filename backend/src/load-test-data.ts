import logger from './logger';
import { User, UserModel } from './models/user.model';
import { Types } from 'mongoose';

const testUsers: any[] = [
    {
        _id: new Types.ObjectId('624b2c7606419272411e051f'),
        email: 'miguel@test.com',
        password:
            'd17a8028673f78a4ae113a69c3b3babd6944eca6b29a2fe4044ef4e2e56eb7e6a0da92d7fdf3886b2f274ebfbf2e2cbb8b764909d0e110eb467f5b42c5cb3697', // test
        salt: 'c17cfb8f242d37766c84dbff0ab139a3',
        firstName: 'Miguel',
        lastName: 'Costero',
        createdAt: new Date('Mon, 04 Apr 2022 17:35:50 GMT'),
        updatedAt: new Date('Mon, 04 Apr 2022 17:35:50 GMT'),
        __v: 0,
    },
];

const loadTestData = async () => {
    logger.debug('Loading users...');
    await Promise.all(testUsers.map((user) => UserModel.create(user)));
};

export default loadTestData;
