import styled from 'styled-components';

const FormGroup = styled.div<{ columns?: number }>`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: ${(props) =>
        props.columns ? `repeat(${props.columns}, 1fr)` : '1fr'};
    overflow: hidden;

    margin-bottom: 1rem;
`;

export default FormGroup;
