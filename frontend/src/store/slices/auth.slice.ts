import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '../../models';

export type AuthState = {
    token?: string;
    user?: UserModel;
};

const initialState: AuthState = {
    token: localStorage.getItem('token') || undefined,
};

// slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        setUser(state, action: PayloadAction<UserModel>) {
            state.user = action.payload;
        },
        logout(state) {
            state.token = undefined;
            state.user = undefined;
            localStorage.removeItem('token');
        },
    },
});

// actions
export const authActions = authSlice.actions;

// reducer
export const authReducer = authSlice.reducer;
