import { FC } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100vh;
`;

const SplashScreen: FC = () => {
    return (
        <Container>
            <Spinner />
        </Container>
    );
};

export default SplashScreen;
