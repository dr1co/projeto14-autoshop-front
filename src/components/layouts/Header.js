import axios from 'axios';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../../contexts/UserContext';
import { IonSearchbar } from '@ionic/react';

export default function Header() {
    return (
        <Container>
            <Menu>

            </Menu>
            <IonSearchbar />
            <Cart>

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