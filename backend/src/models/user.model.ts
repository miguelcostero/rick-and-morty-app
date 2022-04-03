import { getModelForClass, prop } from '@typegoose/typegoose';
import { IModelOptions } from '@typegoose/typegoose/lib/types';
import { Connection } from 'mongoose';

export class UserModel {
    @prop({ required: true, lowercase: true })
    email!: string;

    @prop({ required: true })
    password!: string;
}

export const createUserModel = (connection?: Connection) => {
    const options: IModelOptions = {};

    if (connection) {
        options.existingConnection = connection;
    }

    return getModelForClass(UserModel, options);
};
