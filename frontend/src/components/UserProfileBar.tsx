import { FC } from 'react';
import { useNavigate } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { authActions } from '../store/slices/auth.slice';
import LinkButton from './LinkButton';

const Container = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

type Props = {
    title: string;
};

const UserProfileBar: FC<Props> = ({ title }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.auth.user);

    const logout = () => {
        dispatch(authActions.logout());
        navigate('/login');
    };

    return (
        <Container>
            <h1>{title}</h1>

            <div>
                {user?.fullName} ({user?.email}) -
                <LinkButton type="button" onClick={logout}>
                    Log Out
                </LinkButton>
            </div>
        </Container>
    );
};

export default UserProfileBar;
