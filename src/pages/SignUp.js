import { useState } from "react";
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
    const navigate = useNavigate();

    const body = {
        name,
        email,
        password
    }

    password === rePassword ? setIsDisabled(false) : setIsDisabled(true);

    return (
        <>
            <Form endpoint={"/signup"} action={() => navigate("/login")} body={body}>
                <Input text={"Nome"} setValue={setName} />
                <Input text={"Email"} setValue={setEmail}/>
                <Input text={"Senha"} setValue={setPassword}/>
                <Input text={"Confirme a senha"} setValue={setRePassword}/>
                <ButtonForm text={"Cadastrar"} isDisabled={isDisabled} />
            </Form>
        </>
    );
}