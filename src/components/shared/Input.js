import styled from "styled-components";
import { FlexContainer } from "../styles/FlexContainer";

export default function Input({ setValue, value, text, type, name, result = [] }) {
    const error = result && result.find(r => r.label === name)
    function setInput(value) {
        setValue(value);
    }
    return (
        <FlexContainer direction={"column"} >
            <StyledInput color={error && "red"} value={value} placeholder={text} onChange={(e) => setInput(e.target.value)} type={type ? type : "text"} />
            {error && <ErrorSpan>{error.text}</ErrorSpan>}
        </FlexContainer>
    )
}

const StyledInput = styled.input`
    width: 100%;
    height: 50px;
    border: 1px solid ${({ color }) => color ? color : "gray"};
    border-radius: 25px;
    padding: 15px;
    font-size: 18px;
`;

const ErrorSpan = styled.span`
    font-family: 'Inter', sans-serif;
    margin-top: 5px;
    color: red;
    font-size: 10px;
`;


