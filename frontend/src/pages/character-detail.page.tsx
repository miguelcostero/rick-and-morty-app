import { FC } from 'react';
import { RouteComponentProps } from '@reach/router';

type Props = RouteComponentProps & {
    id?: string;
};

const CharacterDetailPage: FC<Props> = ({ id }) => {
    console.log(id);

    return null;
};

export default CharacterDetailPage;
