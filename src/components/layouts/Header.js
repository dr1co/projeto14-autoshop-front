import axios from 'axios';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../../contexts/UserContext';
import { IonSearchbar, IonIcon } from '@ionic/react';
import { menuOutline, cart } from 'ionicons/icons';

export default function Header() {
    return (
        <Container>
            <Menu>
                <IonIcon icon={menuOutline} />
            </Menu>
            <IonSearchbar />
            <Cart>
                <IonIcon icon={cart} />
            </Cart>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 80px;
    padding: 0 30px;
    background: var(--primary-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
`;

const Menu = styled.div`
    width: 100%;
    height: fit-content;
`;

const Cart = styled.div`
    width: 100%;
    height: fit-content;
`;