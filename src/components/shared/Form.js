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


        const promise = auth ?
            axios.post(API + endpoint, body, user.token) :
            axios.post(API + endpoint, body);
        promise.then(res => {            
            action(res);
            console.log(res);
            setIsLoading(false);
        }).catch(err => {
            const { response } = err;
            setIsLoading(false);
            action(response);
        });

    }
    return (
        <StyledForm onSubmit={(e) => sendForm(e)}>
            {children}
        </StyledForm>
    );
}

const StyledForm = styled.form`

`;