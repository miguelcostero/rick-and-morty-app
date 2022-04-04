import { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import Box from '../components/Box';
import Container from '../components/Container';
import sadMorty from '../assets/images/sad_morty.jpeg';
import styled from 'styled-components';

const Img = styled.img`
    display: block;
    width: 100%;
    height: auto;
`;

const Title = styled.h1`
    font-size: 5rem;
    margin-bottom: 1rem;
`;

const Subtitle = styled.p`
    font-size: 1.5rem;
    font-weight: lighter;
    margin-top: 0;
    margin-bottom: 0;
`;

const NotFoundPage: FC<RouteComponentProps> = () => {
    return (
        <Container>
            <Box>
                <Img src={sadMorty} alt="Sad Rick" />

                <Title>404</Title>

                <Subtitle>Page not found</Subtitle>
            </Box>
        </Container>
    );
};

export default NotFoundPage;
