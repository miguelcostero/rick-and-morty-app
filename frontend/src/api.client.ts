import axios from 'axios';
import { Character, CharacterDetail, UserModel } from './models';
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

    public async login(
        email: string,
        password: string,
    ): Promise<{
        token: string;
        user: UserModel;
    }> {
        const r = await this.httpClient.post<{
            token: string;
            user: UserModel;
        }>('/auth/login', {
            email,
            password,
        });
        return r.data;
    }

    public async signup(
        data: Omit<UserModel, '_id' | 'fullName'> & {
            password: string;
            repeatPassword: string;
        },
    ): Promise<{
        token: string;
        user: UserModel;
    }> {
        const r = await this.httpClient.post<{
            token: string;
            user: UserModel;
        }>('/auth/signup', data);
        return r.data;
    }

    public async getUser(): Promise<UserModel> {
        const r = await this.httpClient.get<UserModel>('/user/me');
        return r.data;
    }

    public async getCharacters(
        pageNumber = 1,
    ): Promise<{ hasMore: boolean; data: Character[] }> {
        const r = await this.httpClient.get<{
            pageNumber: number;
            total: number;
            data: Character[];
        }>('/character', {
            params: { pageNumber },
        });
        return {
            hasMore: r.data.total > pageNumber * 20,
            data: r.data.data.map((c) => ({
                ...c,
                created: new Date(c.created),
                favSince: c.favSince ? new Date(c.favSince) : undefined,
            })),
        };
    }

    public async getCharacter(id: number): Promise<CharacterDetail> {
        const r = await this.httpClient.get<CharacterDetail>(
            `/character/${id}`,
        );
        return {
            ...r.data,
            created: new Date(r.data.created),
            favSince: r.data.favSince ? new Date(r.data.favSince) : undefined,
        };
    }

    public async addFavCharacter(id: number): Promise<void> {
        await this.httpClient.post(`/character/${id}/fav`);
    }

    public async removeFavCharacter(id: number): Promise<void> {
        await this.httpClient.delete(`/character/${id}/fav`);
    }
}
