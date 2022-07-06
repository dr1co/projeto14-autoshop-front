import styled from "styled-components";

export default function Input({ setValue, text, type }) {
    return(
        <StyledInput placeholder={text} onChange={() => setValue} type={type ? type : "text"}/>
    );
}
const StyledInput = styled.input`

`;