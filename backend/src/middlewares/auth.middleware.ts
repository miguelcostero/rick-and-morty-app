import { Types } from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
import type { Middleware } from '../types';
import { UserModel } from '../models/user.model';

export const authMiddleware: Middleware = async (req, res, next) => {
    const token = req.header('authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    try {
        const decoded = jsonwebtoken.verify(
            token,
            process.env.JWT_SECRET as string,
        ) as jsonwebtoken.JwtPayload;

        if (!Types.ObjectId.isValid(decoded.userId)) {
            res.status(400).json({ error: 'Not valid id' });
            return;
        }

        const user = await UserModel.findOne({ _id: decoded.userId });
        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }

        res.locals.user = user;
    } catch (err) {
        if (err instanceof jsonwebtoken.TokenExpiredError) {
            res.status(401).json({ error: 'Token expired' });
            return;
        } else if (err instanceof jsonwebtoken.JsonWebTokenError) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }

        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    next();
};
