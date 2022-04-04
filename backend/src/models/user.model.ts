import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { hashPassword } from '../helpers/auth.helpers';

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
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

    public publicMask(this: DocumentType<User>) {
        return {
            _id: String(this._id),
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: `${this.firstName} ${this.lastName}`,
            email: this.email,
        };
    }

    public validatePassword(this: DocumentType<User>, password: string) {
        const hashedPassword = hashPassword(this.salt, password);
        return this.password === hashedPassword;
    }
}

export const UserModel = getModelForClass(User);
