import { FC } from 'react';
import styled, { keyframes } from 'styled-components';

const animation = keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
`;

const Loader = styled.div`
    margin: 60px auto;
    font-size: 5px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(255, 255, 255, 0.2);
    border-right: 1.1em solid rgba(255, 255, 255, 0.2);
    border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
    border-left: 1.1em solid #ffffff;
    transform: translateZ(0);
    animation: ${animation} 1.1s infinite linear;

    &,
    &::after {
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
    }
`;

const Spinner: FC = () => {
    return <Loader>Loading...</Loader>;
};

export default Spinner;
