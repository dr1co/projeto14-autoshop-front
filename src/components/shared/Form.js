import axios from "axios";
import styled from "styled-components";
import { API } from "../../API";
import { useIsLoadingContext } from "../../contexts/IsLoadingContext";
import { useUserContext } from "../../contexts/UserContext";

export default function Form({ children, body, auth, action, endpoint }) {
    const { user } = useUserContext();
    const { setIsLoading } = useIsLoadingContext();

    async function sendForm(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await auth ?
                axios.post(API + endpoint, body, user.token) :
                axios.post(API + endpoint, body);
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