import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from "../components/shared/Form.js";
import Input from "../components/shared/Input.js";
import ButtonForm from "../components/shared/ButtonForm.js";
import { useUserContext } from '../contexts/UserContext';

export default function Login (){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [result, setResult] = useState([]);
    const { setUser } = useUserContext();
    const navigate = useNavigate();

    const body = {
        email,
        password
    };

    useEffect(() => {
        if (password.length > 0) setIsDisabled(false);
        else setIsDisabled(true);
    }, [password])

    function validate(res) {
        if (res.status === 200) {
            //localStorage.setItem("autoshop-user", JSON.stringify(res.data.token)); => persistência de login
            setUser(res.data);
            setTimeout(() => navigate("/home"), 3000);
        } else {
            setPassword("");
        }
        setResult(res.data);
    }

    return(
        <>
            <Form endpoint={"/login"} action={validate} body={body}>
                <Input text={"Email"} name={"email"} setValue={setEmail} value={email} result={result} />
                <Input text={"Senha"} setValue={setPassword} value={password} type={"password"} />
                <ButtonForm text={"Fazer login"} isDisabled={isDisabled} />
            </Form>
        </>
    );
}