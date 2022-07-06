import styled from "styled-components";


export default function ButtonForm ({text, isDisabled}){
    
    return(
        <StyledButton disabled={isDisabled}>{text}</StyledButton>
    );
}

const StyledButton = styled.button`
    :disabled{
        opacity: 0.5;
    }
`;