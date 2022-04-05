import styled from 'styled-components';
import { Character } from '../models';

const StatusDot = styled.span<{ status: Character['status'] }>`
    height: 10px;
    width: 10px;
    background-color: ${(props) => {
        if (props.status === 'Alive') {
            return '#00ff00';
        }

        if (props.status === 'Dead') {
            return '#ff0000';
        }

        return '#bbb';
    }};
    border-radius: 50%;
    display: inline-block;
`;

export default StatusDot;
