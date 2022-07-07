import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Form from "../components/shared/Form.js";
import Input from "../components/shared/Input.js";
import ButtonForm from "../components/shared/ButtonForm.js";
import { FlexContainer } from "../components/styles/FlexContainer";
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
        <FlexContainer direction={"column"} justify={"center"} align={"center"}>
            <Title> Faça login </Title>
            <Form endpoint={"/login"} action={validate} body={body}>
                <Input text={"Email"} name={"email"} setValue={setEmail} value={email} result={result} />
                <Input text={"Senha"} setValue={setPassword} value={password} type={"password"} />
                <ButtonForm text={"Fazer login"} isDisabled={isDisabled} />
            </Form>
            <StyledSpan onClick={() => navigate("/signup")}> Não possui uma conta? Cadastre-se! </StyledSpan>
        </FlexContainer>
    );
}

const Title = styled.span`
    font-size: 22px;
    font-weight: 600;
    color: black;
    margin-bottom: 20px;
`;

const StyledSpan = styled.span`
    margin-top: 20px;
    font-size: 16px;
    font-weight: 600;
    color:black;
    cursor: pointer;
`;