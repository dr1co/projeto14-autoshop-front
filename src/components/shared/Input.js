import { TextField } from "@mui/material"

export default function Input({ setValue, value, text, type, name, result }) {
    const error = result && result.find(r => r.label === name)
    function setInput(value) {
        setValue(value);
    }
    return (
        <TextField error={error ? true : false} value={value} label={text} helperText={error && error.text} onChange={(e) => setInput(e.target.value)} type={type ? type : "text"} />
    )
}


