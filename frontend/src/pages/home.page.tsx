import { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import withAuth from '../hoc/with-auth';

const HomePage: FC<RouteComponentProps> = () => {
    return (
        <div>
            <h1>HomePage</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Quaerat voluptas facilis quisquam, quidem beatae praesentium
                eveniet architecto optio vero dignissimos eius harum
                exercitationem veniam officia tempora, excepturi ducimus vitae
                aperiam.
            </p>
        </div>
    );
};

export default withAuth(HomePage);