import axios from 'axios';
import { UserModel } from './models';
import { store } from './store';

export class ApiClient {
    private static instance: ApiClient;
    private readonly httpClient = axios.create({
        baseURL: import.meta.env.VITE_BASE_API_URL,
    });

    private constructor() {
        this.httpClient.interceptors.request.use(
            (config) => {
                const token = store.getState().auth.token;

                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            (error) => Promise.reject(error),
        );
    }

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }

        return ApiClient.instance;
    }

    public async login(email: string, password: string) {
        const r = await this.httpClient.post<{
            token: string;
            user: UserModel;
        }>('/auth/login', {
            email,
            password,
        });
        const r_1 = r.data;
        return { ...r_1, user: new UserModel(r_1.user) };
    }

    public async signup(
        data: Omit<UserModel, '_id' | 'fullName'> & {
            password: string;
            repeatPassword: string;
        },
    ) {
        const r = await this.httpClient.post<{
            token: string;
            user: UserModel;
        }>('/auth/signup', data);
        const d = r.data;
        return { ...d, user: new UserModel(d.user) };
    }

    public async getUser() {
        const r = await this.httpClient.get<UserModel>('/user/me');
        return new UserModel(r.data);
    }
}
