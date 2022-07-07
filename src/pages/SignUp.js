import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/shared/Form";
import Input from "../components/shared/Input";
import ButtonForm from "../components/shared/ButtonForm";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [result, setResult] = useState([]);
    const navigate = useNavigate();

    const body = {
        name,
        email,
        password
    }

    useEffect(() => {
        if ((password.length > 0 && rePassword.length > 0) && password === rePassword) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [password, rePassword]);

    function validate(result) {
        if (result.status === 200) {
            setTimeout(() => navigate("/login"), 3000)
        } else {
            setPassword("");
            setRePassword("");
        }
        setResult(result.data);
    }

    return (
        
        <Form endpoint={"/signup"} action={validate} body={body}>
            <Input text={"Nome"} name={"name"} setValue={setName} value={name} result={result}  />
            <Input text={"Email"} name={"email"} setValue={setEmail} value={email} result={result} />
            <Input text={"Senha"} value={password} setValue={setPassword} type={"password"} />
            <Input text={"Confirme a senha"} value={rePassword} setValue={setRePassword} type={"password"} />
            <ButtonForm text={"Cadastrar"} isDisabled={isDisabled} />
        </Form>

    );
}