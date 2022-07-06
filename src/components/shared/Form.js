import axios from "axios";
import styled from "styled-components";
import { useIsLoandingContext } from "../../contexts/IsLoadingContext";
import { useUserContext } from "../../contexts/UserContext";

export default function Form({ children, body, auth, action, endpoint }) {
    const { user } = useUserContext();
    const {setIsLoading} = useIsLoandingContext();

    async function sendForm(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await auth ?
                axios.post(endpoint, body, user.token) :
                axios.post(endpoint, body);
            action(data);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }
    return (
        <StyledForm onSubmit={(e) => sendForm(e)}>
            {children}
        </StyledForm>
    );
}

const StyledForm = styled.form`

`;