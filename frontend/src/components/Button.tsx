import styled from 'styled-components';

const Button = styled.button`
    display: block;
    padding: 10px;
    border: none;
    border-radius: 5px;
    color: #222222;
    background: #ffffff;
    font-size: 16px;
    outline: none;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export default Button;
