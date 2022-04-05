import styled from 'styled-components';

const Grid = styled.div<{ columns?: number }>`
    display: grid;
    grid-template-columns: repeat(
        ${(props) => props.columns || 'auto-fit'},
        minmax(200px, 1fr)
    );
    grid-gap: 1rem;
`;

export default Grid;
