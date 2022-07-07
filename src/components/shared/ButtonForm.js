import { IonIcon } from "@ionic/react";
import { save } from "ionicons/icons";
import styled from "styled-components";
import { ThreeDots } from 'react-loader-spinner';
import { useIsLoadingContext } from "../../contexts/IsLoadingContext";


export default function ButtonForm({ text, isDisabled }) {
    const { isLoading } = useIsLoadingContext();

    return (
        <StyledButton disabled={isDisabled}>{isLoading ? <ThreeDots color={'white'} /> : text}</StyledButton>
    );
}

const StyledButton = styled.button`

    border: none;
    border-radius: 25px;
    color: white;
    background-color: var(--primary-color);
    height: 50px;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    :disabled{
        opacity: 0.5;
    }
`;