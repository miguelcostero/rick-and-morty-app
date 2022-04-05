import { FC } from 'react';
import styled from 'styled-components';
import { Character } from '../models';
import DetailTitle from './DetailTitle';
import StarIcon from './StarIcon';
import StatusDot from './StatusDot';

type Props = {
    character: Character;

    onClick?(): void;
};

const Container = styled.div`
    cursor: pointer;
    background-color: #393944;
    border-radius: 5px;
    overflow: hidden;

    display: flex;

    transition: background-color ease-in-out 300ms;

    img {
        display: block;
        width: 30%;
    }

    .info {
        margin: 1rem;
        width: 100%;
        overflow: hidden;
        position: relative;

        h3 {
            margin-top: 0;
            margin-bottom: 0.5rem;
        }

        p {
            margin-top: 0;
        }
    }

    &:hover {
        background-color: #3e3e4a;
    }

    .fav {
        position: absolute;
        top: 0;
        right: 0;
    }
`;

const CharacterBox: FC<Props> = ({
    character,
    onClick: handleClick = () => {},
}) => {
    return (
        <Container onClick={handleClick}>
            <img src={character.image} alt={character.name} />

            <div className="info">
                <h3>{character.name}</h3>

                <p>
                    <StatusDot status={character.status} /> {character.status} -{' '}
                    {character.species}
                </p>

                <DetailTitle>Last known location</DetailTitle>
                <p>{character.locationName}</p>

                <DetailTitle>Origin</DetailTitle>
                <p>{character.origin}</p>

                <div className="fav">
                    <StarIcon enabled={character.isFav} />
                </div>
            </div>
        </Container>
    );
};

export default CharacterBox;
