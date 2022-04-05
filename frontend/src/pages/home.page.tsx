import { FC, useEffect, useState } from 'react';
import { RouteComponentProps, useNavigate } from '@reach/router';
import { ApiClient } from '../api.client';
import withAuth from '../hoc/with-auth';
import Spinner from '../components/Spinner';
import Grid from '../components/Grid';
import CharacterBox from '../components/CharacterBox';
import { Character } from '../models';
import PageContainer from '../components/PageContainer';
import LoadMoreButton from '../components/LoadMoreButton';

const apiClient = ApiClient.getInstance();

const HomePage: FC<RouteComponentProps> = () => {
    const navigate = useNavigate();

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
        <PageContainer>
            <Grid columns={2}>
                {items.map((c) => (
                    <CharacterBox
                        key={c.id}
                        character={c}
                        onClick={() => navigate(`/character/${c.id}`).then()}
                    />
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
        </PageContainer>
    );
};

export default withAuth(HomePage);
