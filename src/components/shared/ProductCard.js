import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useIsLoadingContext } from '../../contexts/IsLoadingContext';
import { IonIcon } from "@ionic/react";
import { heartOutline, heart } from "ionicons/icons";
import { useUserContext } from '../../contexts/UserContext';
import { API } from '../../API';

function ProductCard({ product, message, setMessage }) {
    console.log(product)
    const [showDesc, setShowDesc] = useState(false);
    const { user, setUser } = useUserContext();
    const { isLoading, setIsLoading } = useIsLoadingContext();
    const navigate = useNavigate();
    const timer = 3000;

    function mouseOver() {
        setShowDesc(true);
    }

    function mouseOut(){
        setShowDesc(false);
    }

    function addToCart() {
        if (user.auth && !isLoading) {
            setIsLoading(true);
            const request = axios.post(`${API}/user/cart`, { id: product._id }, user.auth);
            request.then((res) => {
                setUser({
                    ...user,
                    cart: res.data
                });
                setIsLoading(false);
            });
            request.catch((err) => {
                console.log(err.response);
                setIsLoading(false);
            });
        } else if (!user.auth) {
            setMessage("Usuário não encontrado, faça login!");
            setTimeout(() => {
                setMessage("");
                navigate("/");
            }, timer);
        } else if (!message) {
            setMessage("Botão está desabilitado, aguarde!");
            setTimeout(() => {
                setMessage("");
            }, timer);
        }
    }

    function addToFavorites() {
        if (user.auth && !isLoading) {
            setIsLoading(true);
            const request = axios.post(`${API}/user/favorites`, product, user.auth);
            request.then((res) => {
                setUser({
                    ...user,
                    favorites: res.data
                });
                setIsLoading(false);
            });
            request.catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
        } else if (!user.auth) {
            setMessage("Não há usuário logado. Faça login agora!");
            setTimeout(() => {
                setMessage("");
                setIsLoading(false);
            }, timer);
        } else if (!message) {
            setMessage("Botão desabilitado, aguarde!");
            setTimeout(() => {
                setMessage("");
            }, timer);
        }
        console.log("added to favorites");
    }

    return (
        <ProductContainer>
            <ProductFront display={showDesc ? "none" : "flex"} onMouseEnter={mouseOver}>
                <img src={product.image} onMouseEnter={mouseOver} />
                <ProductTitle>
                    <h1>{product.name}</h1>
                    <StyledIonIcon
                    icon={user.favorites.includes(product._id) ? heart : heartOutline}
                    color={user.favorites.includes(product._id) ? "red" : "black"} />
                </ProductTitle>
                <p>{product.currency_symbol} {Number(product.price).toFixed(2)}</p>
            </ProductFront>
            <ProductBack display={showDesc ? "flex" : "none"} onMouseLeave={mouseOut}>
                <p>{product.description}</p>
                <ProductButtons>
                    <div>
                        <button onClick={() => navigate(`/products/${product._id}`)}>Ver mais detalhes</button>
                        <button onClick={addToCart}>Comprar produto</button>
                    </div>
                    <StyledIonIcon
                    icon={user.favorites.includes(product._id) ? heart : heartOutline}
                    onClick={addToFavorites}
                    color={user.favorites.includes(product._id) ? "red" : "black"} />
                </ProductButtons>
            </ProductBack>
        </ProductContainer>
    )
}

function NoProduct() {
    return (
        <NoProductContainer>
            <p> Não há produtos para mostrar aqui no momento :( </p>
        </NoProductContainer>
    )
}

const ProductContainer = styled.div`
    min-width: 270px;
    max-width: 270px;
    height: 300px;
    margin: 10px;
    background: #FFFFFF;
    border-radius: 10px;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
    position: relative;

    &:first-of-type {
        margin-left: 0px;
    }
`;

const ProductFront = styled.div`
    display: ${props => props.display};
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    img {
        width: 100%;
        min-height: 220px;
        object-fit: cover;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
    }

    p {
        width: 100%;
        padding: 0 10px;
        font-size: 16px;
        font-weight: 600;
        text-align: left;
        color: var(--secondary-color);
    }
`;

const ProductTitle = styled.span`
    width: 100%;
    margin: 12px auto;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-size: 18px;
        font-weight: 700;
        display: flex;
        align-items: center;
        color: var(--primary-color);
    }
`;

const ProductBack = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    color: #000000;
    display: ${props => props.display};
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;

    p {
        width: 100%;
        height: 220px;
        font-size: 16px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        text-overflow: ellipsis;
    }
`;

const ProductButtons = styled.div`
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;

    div {
        width: 75%;
        height: fit-content;
    }

    button {
        width: 100%;
        height: 30px;
        margin: 3px auto;
        background: var(--primary-color);
        color: #FFFFFF;
        border: 0px solid transparent;
        border-radius: 15px;
        font-size: 13px;
        cursor: pointer;

        &:active {
            background: darkblue;
        }
    }
`;

const StyledIonIcon = styled(IonIcon)`
    font-size: 25px;
    cursor: pointer;
    color: ${props => props.color};
`;

const NoProductContainer = styled.div`
    width: 100%;
    height: 320px;
    border: 2px dashed var(--primary-color);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    p{
        font-size: 20px;
        color: var(--secondary-color);
    }
`;

export { ProductCard, NoProduct };