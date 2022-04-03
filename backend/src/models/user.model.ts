import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { IModelOptions, DocumentType } from '@typegoose/typegoose/lib/types';
import { Connection } from 'mongoose';
import { hashPassword } from '../helpers/auth.helpers';

@modelOptions({ schemaOptions: { timestamps: true } })
export class UserModel {
    @prop({ required: true, lowercase: true })
    email!: string;

    @prop({ required: true })
    password!: string;

    @prop({ required: true })
    salt!: string;

    @prop({ required: true })
    firstName!: string;

    @prop({ required: true })
    lastName!: string;

    public publicMask(this: DocumentType<UserModel>) {
        return {
            _id: String(this._id),
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: `${this.firstName} ${this.lastName}`,
            email: this.email,
        };
    }

    public validatePassword(this: DocumentType<UserModel>, password: string) {
        const hashedPassword = hashPassword(this.salt, password);
        return this.password === hashedPassword;
    }
}

export const createUserModel = (connection?: Connection) => {
    const options: IModelOptions = {};

    if (connection) {
        options.existingConnection = connection;
    }

    return getModelForClass(UserModel, options);
};
