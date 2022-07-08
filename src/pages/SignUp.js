import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Form from "../components/shared/Form";
import Input from "../components/shared/Input";
import ButtonForm from "../components/shared/ButtonForm";
import { FlexContainer } from "../components/styles/FlexContainer";

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
        <FlexContainer direction={"column"} justify={"center"} align={"center"}>
            <Title>Faça seu cadastro</Title>
            <Form endpoint={"/signup"} action={validate} body={body}>
                <Input text={"Nome"} name={"name"} setValue={setName} value={name} result={result} />
                <Input text={"Email"} name={"email"} setValue={setEmail} value={email} result={result} />
                <Input text={"Senha"} type={"password"} value={password} setValue={setPassword} />
                <Input text={"Confirme a senha"} type={"password"} value={rePassword} setValue={setRePassword} />
                <ButtonForm text={"Cadastrar"} isDisabled={isDisabled} />
            </Form>

            <StyledSpan onClick={() => navigate("/login")}>Já tem conta? Faça login</StyledSpan>

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