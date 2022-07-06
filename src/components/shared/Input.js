import styled from "styled-components";

export default function Input({ setValue, value, text, type, name, result, setResult }) {
    const error = result && result.find(r => r.label === name)

    if(error){
        value = "";
    }

    function setInput(value) {
        setValue(value);
        error && setResult(result.filter(err => err.label !== name));
    }

    return (
        <StyledInput color={error ? "red" : "transparent"} value={value} placeholder={error ? error.text : text} onChange={(e) => setInput(e.target.value)} type={type ? type : "text"} />
    );
}
const StyledInput = styled.input`
    border: 1px solid ${({ color }) => color};
`;