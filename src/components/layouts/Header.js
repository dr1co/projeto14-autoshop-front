import { useState } from "react";
import styled from "styled-components";

import ProductForm from "../ProductForm";
import AddProductButton from "../shared/AddProductButton";
import { IonIcon } from "@ionic/react";
import { menuOutline, cart } from "ionicons/icons";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [isHidden, setIsHidden] = useState(true);
    const navigate = useNavigate();

    return (
        <Container>
            <LeftIcons>
                <AddProductButton onClick={setIsHidden} />
                {!isHidden && <ProductForm setIsHidden={setIsHidden} />}
                <StyledIcon icon={menuOutline} onClick={() => navigate("/home")} />
            </LeftIcons>
            <SearchBar placeholder="Pesquise por aqui" />
            <RightIcons>
                <StyledIcon icon={cart} onClick={() => navigate("/checkout")} />
            </RightIcons>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 75px;
    padding: 0 30px;
    background: var(--primary-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
`;

const LeftIcons = styled.div`
    width: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SearchBar = styled.input`
    width: 700px;
    height: 45px;
    padding: 10px;
    background: #FFFFFF;
    border: 1px solid #000000;
    border-radius: 23px;
`;

const StyledIcon = styled(IonIcon)`
    font-size: 45px;
    color: #FFFFFF;
    cursor: pointer;
`;

const RightIcons = styled.div`
    width: 100px;
    display: flex;
    justify-content: left;
    align-items: center;
`;