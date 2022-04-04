export class UserModel {
    _id!: string;
    email!: string;
    firstName!: string;
    lastName!: string;

    constructor(data: UserModel) {
        // @ts-ignore
        Object.entries(data).forEach(([k, v]) => (this[k] = v));
    }
}
