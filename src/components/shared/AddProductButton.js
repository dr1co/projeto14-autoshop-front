import styled from "styled-components";

import { IonIcon } from "@ionic/react";
import { addCircle } from "ionicons/icons"; 

export default function AddProductButton({onClick}){
  return(
    <StyledIcon icon={addCircle} onClick={() => onClick(false)} />
  );
}

const StyledIcon = styled(IonIcon)`
  font-size: 45px;
  color: #FFFFFF;
  cursor: pointer;
`;