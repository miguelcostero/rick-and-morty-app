import { FC } from 'react';
import { useAsync } from 'react-use';
import { Redirect } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { ApiClient } from '../api.client';
import Spinner from '../components/Spinner';
import { authActions } from '../store/slices/auth.slice';

const apiClient = ApiClient.getInstance();

const withAuth = (WrappedComponent: FC) => {
    const WithAuth: FC = (props) => {
        const dispatch = useDispatch();

        const token = useSelector((state: RootState) => state.auth.token);
        const user = useSelector((state: RootState) => state.auth.user);

        const state = useAsync(async () => {
            if (token && !user) {
                const user = await apiClient.getUser();
                dispatch(authActions.setUser(user));
            }
        }, [token, user]);

        if (state.loading) {
            return <Spinner />;
        }

        if (!token || (state.error && !state.loading)) {
            return <Redirect to="/login" noThrow />;
        }

        return <WrappedComponent {...props} />;
    };

    return WithAuth;
};

export default withAuth;
