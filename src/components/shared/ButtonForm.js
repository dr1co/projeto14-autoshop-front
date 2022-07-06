import styled from "styled-components";
import { useIsLoandingContext } from "../../contexts/IsLoadingContext";

export default function ButtonForm ({text}){
    const {isLoading} = useIsLoandingContext();
    return(
        <StyledButton disabled={isLoading}>{text}</StyledButton>
    );
}

const StyledButton = styled.button`
    :disabled{
        opacity: 0.5;
    }
`;