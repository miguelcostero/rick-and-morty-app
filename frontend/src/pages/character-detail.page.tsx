import { FC, useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { RouteComponentProps, useNavigate } from '@reach/router';
import { ApiClient } from '../api.client';
import PageContainer from '../components/PageContainer';
import Spinner from '../components/Spinner';
import withAuth from '../hoc/with-auth';
import StatusDot from '../components/StatusDot';
import Button from '../components/Button';
import StarIcon from '../components/StarIcon';
import DetailTitle from '../components/DetailTitle';
import styled from 'styled-components';
import LinkButton from '../components/LinkButton';
import Title from '../components/Title';

const apiClient = ApiClient.getInstance();

const Grid = styled.div<{
    direction?: 'row' | 'column';
    justify?: string;
    align?: string;
}>`
    display: flex;
    flex-direction: ${(props) => props.direction || 'row'};
    ${(props) => props.justify && `justify-content: ${props.justify};`};
    ${(props) => props.align && `align-items: ${props.align};`};

    p {
        margin-top: 0;
    }
`;

const Box = styled(Grid)`
    background-color: #393944;
    border-radius: 5px;
    padding: 1rem;
`;

const Col = styled.div<{ width: number }>`
    display: block;
    width: ${({ width }) => `${width}%`};
    margin-right: 1.5rem;

    &:last-child {
        margin-right: 0;
    }
`;

const Img = styled.img`
    display: block;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 1rem;
`;

type Props = RouteComponentProps & {
    id?: string;
};

const CharacterDetailPage: FC<Props> = ({ id }) => {
    const navigate = useNavigate();

    const [{ loading: isLoading, value: character }, fetchCharacter] =
        useAsyncFn(async () => {
            try {
                if (!id) {
                    throw new Error('No id provided');
                }

                const characterId = parseInt(id, 10);
                const result = await apiClient.getCharacter(characterId);

                return result;
            } catch (err) {
                console.error(err);
            }
        }, [id]);

    const [{ loading: isToggleFavLoading }, toggleFav] =
        useAsyncFn(async () => {
            if (!character) {
                return;
            }

            try {
                await (character.isFav
                    ? apiClient.removeFavCharacter(character.id)
                    : apiClient.addFavCharacter(character.id));

                await fetchCharacter();
            } catch (err) {
                console.error(err);
            }
        }, [character, fetchCharacter]);

    useEffect(() => {
        fetchCharacter().then();
    }, []);

    return (
        <PageContainer>
            <LinkButton
                type="button"
                onClick={() => navigate('/home').then()}
                style={{ marginBottom: '1rem' }}
            >
                {'<'} Go back
            </LinkButton>

            {isLoading && !character && <Spinner />}

            {character && (
                <Box>
                    <Col width={30}>
                        <Img src={character.image} alt={character.name} />

                        <p>
                            <StatusDot status={character.status} />{' '}
                            {character.status} - {character.species}
                        </p>

                        <DetailTitle>Last known location</DetailTitle>
                        <p>{character.locationName}</p>

                        <DetailTitle>Origin</DetailTitle>
                        <p>{character.origin}</p>
                    </Col>

                    <Col width={70}>
                        <Grid
                            direction="row"
                            justify="space-between"
                            align="center"
                        >
                            <h1 style={{ marginTop: 0, marginBottom: 0 }}>
                                {character.name}
                            </h1>

                            <div>
                                <Button
                                    type="button"
                                    onClick={toggleFav}
                                    disabled={isToggleFavLoading || isLoading}
                                >
                                    <StarIcon sm enabled={character.isFav} />

                                    <span style={{ marginLeft: 5 }}>
                                        {isToggleFavLoading || isLoading
                                            ? 'Loading...'
                                            : character.isFav
                                            ? 'Remove from favorites'
                                            : 'Add to favorites'}
                                    </span>
                                </Button>
                            </div>
                        </Grid>

                        <hr
                            style={{ marginTop: '1rem', marginBottom: '1rem' }}
                        />

                        <Title>Episodes list:</Title>

                        <ul>
                            {character.episodes.map((episode) => (
                                <li
                                    key={episode.id}
                                    style={{ marginBottom: '1rem' }}
                                >
                                    <Title>
                                        <b>{episode.name}</b> - {episode.code}
                                    </Title>

                                    <DetailTitle>{episode.airDate}</DetailTitle>
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Box>
            )}
        </PageContainer>
    );
};

export default withAuth(CharacterDetailPage);
