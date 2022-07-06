import LoadingButton from '@mui/lab/LoadingButton';
import { IonIcon } from "@ionic/react";
import {save} from "ionicons/icons";
import { useIsLoadingContext } from "../../contexts/IsLoadingContext";


export default function ButtonForm({ text, isDisabled }) {
    const { isLoading } = useIsLoadingContext();

    return (
        <LoadingButton
            loading={isLoading}
            loadingPosition="start"
            startIcon={<IonIcon icon={save}></IonIcon>}
            type={"submit"}
            disabled={isDisabled}
            variant={"contained"}
        >
            {text}
        </LoadingButton>
    );
}