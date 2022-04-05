import { FC } from 'react';
import styled from 'styled-components';

export type AlterType =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';

const Wrapper = styled.div<{ type: AlterType }>`
    position: relative;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;

    ${(props) => {
        switch (props.type) {
            case 'primary':
            default:
                return `
                    color: #004085;
                    background-color: #cce5ff;
                    border-color: #b8daff;
                `;
            case 'secondary':
                return `
                    color: #383d41;
                    background-color: #e2e3e5;
                    border-color: #d6d8db;
                `;
            case 'success':
                return `
                    color: #155724;
                    background-color: #d4edda;
                    border-color: #c3e6cb;
                `;
            case 'warning':
                return `
                    color: #856404;
                    background-color: #fff3cd;
                    border-color: #ffeeba;
                `;
            case 'danger':
                return `
                    color: #721c24;
                    background-color: #f8d7da;
                    border-color: #f5c6cb;
                `;
        }
    }}
`;

type Props = {
    type?: AlterType;
};

const Alert: FC<Props> = ({ children, type = 'primary' }) => {
    return <Wrapper type={type}>{children}</Wrapper>;
};

export default Alert;
