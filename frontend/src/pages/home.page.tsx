import { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { ApiClient } from '../api.client';
import withAuth from '../hoc/with-auth';
import Spinner from '../components/Spinner';
import Grid from '../components/Grid';
import CharacterBox from '../components/CharacterBox';
import { Character } from '../models';
import Button from '../components/Button';

const apiClient = ApiClient.getInstance();

const Container = styled.div`
    width: 80%;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
    overflow-x: hidden;
`;

const LoadMoreButton = styled(Button)`
    display: block;
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
`;

const HomePage: FC<RouteComponentProps> = () => {
    const [items, setItems] = useState<Character[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.getCharacters(pageNumber);
            setItems([...items, ...response.data]);
            setHasMore(response.hasMore);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData().then();
    }, [pageNumber]);

    return (
        <Container>
            <h1>HomePage</h1>

            <Grid columns={2}>
                {items.map((c) => (
                    <CharacterBox key={c.id} character={c} />
                ))}
            </Grid>

            {isLoading && <Spinner />}

            {hasMore && !isLoading && (
                <LoadMoreButton
                    type="button"
                    onClick={() => setPageNumber(pageNumber + 1)}
                >
                    Load More
                </LoadMoreButton>
            )}
        </Container>
    );
};

export default withAuth(HomePage);
