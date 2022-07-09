import styled from 'styled-components';

export default function WarnModal({ display, message, color }) {
    return (
        <Container display={display} color={color}>
            <p>{message}</p>
        </Container>
    )
}

const Container = styled.div`
    width: 300px;
    height: 70px;
    background-color: ${props => props.color ? props.color : "red"};
    border-radius: 10px;
    display: ${props => props.display};
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 15px;
    right: 15px;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));

    p {
        font-size: 18px;
        color: #FFFFFF;
    }
`;