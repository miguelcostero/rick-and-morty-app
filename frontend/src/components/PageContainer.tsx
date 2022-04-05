import { FC } from 'react';
import styled from 'styled-components';
import UserProfileBar from './UserProfileBar';

const Container = styled.div`
    width: 80%;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
    overflow-x: hidden;
`;

const PageContainer: FC = ({ children }) => {
    return (
        <Container>
            <UserProfileBar title="Rick & Morty App" />

            {children}
        </Container>
    );
};

export default PageContainer;
