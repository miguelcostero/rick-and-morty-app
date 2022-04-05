import styled from 'styled-components';

const ENABLED_COLOR = '#fc0';
const DISABLED_COLOR = '#ccc';

const StarIcon = styled.i<{ enabled?: boolean; sm?: boolean }>`
    position: relative;

    display: inline-block;
    width: 0;
    height: 0;

    margin-left: 0.9em;
    margin-right: 0.9em;
    margin-bottom: 1.2em;

    border-right: 0.3em solid transparent;
    border-bottom: 0.7em solid
        ${({ enabled }) => (enabled ? ENABLED_COLOR : DISABLED_COLOR)};
    border-left: 0.3em solid transparent;

    /* Controls the size of the stars. */
    font-size: ${({ sm }) => sm ? '8px' : '12px'};

    &:before,
    &:after {
        content: '';

        display: block;
        width: 0;
        height: 0;

        position: absolute;
        top: 0.6em;
        left: -1em;

        border-right: 1em solid transparent;
        border-bottom: 0.7em solid
            ${({ enabled }) => (enabled ? ENABLED_COLOR : DISABLED_COLOR)};
        border-left: 1em solid transparent;

        transform: rotate(-35deg);
    }

    &:after {
        transform: rotate(35deg);
    }
`;

export default StarIcon;
