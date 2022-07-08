import axios from "axios";
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { API } from '../API';
import Header from "../components/layouts/Header.js";
import { FlexContainer } from "../components/styles/FlexContainer.js";
import { useUserContext } from "../contexts/UserContext.js";
import { IonIcon } from "@ionic/react";
import { heartOutline, heart } from "ionicons/icons";
import { useIsLoadingContext } from "../contexts/IsLoadingContext.js";

export default function Home (){
    const [products, setProducts] = useState([
        {
            _id: "123abc",
            name: "produto genérico",
            currency_symbol: "R$",
            description: "top 10 descrições fodas",
            price: 150000.00,
            image: "https://i.ytimg.com/vi/RTFJsGtJEtY/maxresdefault.jpg",
            categoryId: "vehicle",
            brandId: "Uma marca genérica",
            sku: "cod1001"
        },{
            _id: "123abc",
            name: "produto genérico",
            currency_symbol: "R$",
            description: "top 10 descrições fodas",
            price: 150000.00,
            image: "https://i.ytimg.com/vi/RTFJsGtJEtY/maxresdefault.jpg",
            categoryId: "vehicle",
            brandId: "Uma marca genérica",
            sku: "nn sei qq é isso"
        },{
            _id: "123abc",
            name: "produto genérico",
            currency_symbol: "R$",
            description: "top 10 descrições fodas",
            price: 150000.00,
            image: "https://i.ytimg.com/vi/RTFJsGtJEtY/maxresdefault.jpg",
            categoryId: "vehicle",
            brandId: "Uma marca genérica",
            sku: "nn sei qq é isso"
        },{
            _id: "123abc",
            name: "produto genérico",
            currency_symbol: "R$",
            description: "top 10 descrições fodas",
            price: 150000.00,
            image: "https://i.ytimg.com/vi/RTFJsGtJEtY/maxresdefault.jpg",
            categoryId: "vehicle",
            brandId: "Uma marca genérica",
            sku: "nn sei qq é isso"
        },{
            _id: "123abc",
            name: "produto genérico",
            currency_symbol: "R$",
            description: "top 10 descrições fodas",
            price: 150000.00,
            image: "https://i.ytimg.com/vi/RTFJsGtJEtY/maxresdefault.jpg",
            categoryId: "vehicle",
            brandId: "Uma marca genérica",
            sku: "nn sei qq é isso"
        },{
            _id: "123abc",
            name: "produto genérico",
            currency_symbol: "R$",
            description: "top 10 descrições fodas",
            price: 150000.00,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvL0IRqYEf-WlS_7pMLtSejxZ8HwhJAR9BwgfoQ1gdbY1GTLXFnyyevS8j138pyM96Hak&usqp=CAU",
            categoryId: "addon",
            brandId: "Uma marca genérica",
            sku: "nn sei qq é isso"
        },{
            _id: "123abc",
            name: "produto genérico",
            currency_symbol: "R$",
            description: "top 10 descrições fodas",
            price: 150000.00,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvL0IRqYEf-WlS_7pMLtSejxZ8HwhJAR9BwgfoQ1gdbY1GTLXFnyyevS8j138pyM96Hak&usqp=CAU",
            categoryId: "addon",
            brandId: "Uma marca genérica",
            sku: "nn sei qq é isso"
        },{
            _id: "123abc",
            name: "produto genérico",
            currency_symbol: "R$",
            description: "top 10 descrições fodas",
            price: 150000.00,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvL0IRqYEf-WlS_7pMLtSejxZ8HwhJAR9BwgfoQ1gdbY1GTLXFnyyevS8j138pyM96Hak&usqp=CAU",
            categoryId: "addon",
            brandId: "Uma marca genérica",
            sku: "nn sei qq é isso"
        },{
            _id: "123abc",
            name: "produto genérico",
            currency_symbol: "R$",
            description: "top 10 descrições fodas",
            price: 150000.00,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvL0IRqYEf-WlS_7pMLtSejxZ8HwhJAR9BwgfoQ1gdbY1GTLXFnyyevS8j138pyM96Hak&usqp=CAU",
            categoryId: "addon",
            brandId: "Uma marca genérica",
            sku: "nn sei qq é isso"
        },{
            _id: "123abc",
            name: "produto genérico",
            currency_symbol: "R$",
            description: "top 10 descrições fodas",
            price: 150000.00,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvL0IRqYEf-WlS_7pMLtSejxZ8HwhJAR9BwgfoQ1gdbY1GTLXFnyyevS8j138pyM96Hak&usqp=CAU",
            categoryId: "addon",
            brandId: "Uma marca genérica",
            sku: "nn sei qq é isso"
        },{
            _id: "123abc",
            name: "produto genérico",
            currency_symbol: "R$",
            description: "top 10 descrições fodas",
            price: 150000.00,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvL0IRqYEf-WlS_7pMLtSejxZ8HwhJAR9BwgfoQ1gdbY1GTLXFnyyevS8j138pyM96Hak&usqp=CAU",
            categoryId: "addon",
            brandId: "Uma marca genérica",
            sku: "nn sei qq é isso"
        },
    ]);
    const { isLoading, setIsLoading } = useIsLoadingContext();
    const [message, setMessage] = useState("");

    useEffect(() => {
        setIsLoading(true);
        const promise = axios.get(`${API}/products`);
        promise.then((res) => {
            setProducts(res.data);
            setIsLoading(false);
        });
        promise.catch((err) => {
            console.log(err.response);
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            <Header />
            <Container>
                <h1>Lançamentos Recentes</h1>
                <Products justify="space-between" align="center">
                    {isLoading ? "Carregando produtos..." :
                    (products.length === 0 ? "Não há produtos cadastrados :(" :
                    products.reverse().map(p => <Product
                    key={p._id}
                    product={p}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading} />))}
                </Products>
                <SeparationBar />
                <h1>Todos os Produtos</h1>
                <FlexContainer justify="space-between" align="center">
                    <ProductsBox>
                        <h2>Veículos</h2>
                        <Products>
                            {isLoading ? "Carregando produtos..." :
                            (products.length === 0 ? "Não há produtos cadastrados :(" :
                            products.filter(p => p.categoryId === "vehicle").map(p => <Product
                                key={p._id}
                                product={p}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                setMessage={setMessage} />))}
                        </Products>
                    </ProductsBox>
                    <ProductsBox>
                        <h2>Acessórios</h2>
                        <Products>
                            {isLoading ? "Carregando produtos..." :
                            (products.length === 0 ? "Não há produtos cadastrados :(" :
                            products.filter(p => p.categoryId === "addon").map(p => <Product
                            key={p._id}
                            product={p}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            setMessage={setMessage} />))}
                        </Products>
                    </ProductsBox>
                </FlexContainer>
            <WarnModal display={message ? "flex" : "none"}>
                <p>{message}</p>
            </WarnModal>
            </Container>
        </>
    );
}

function Product({ product, isLoading, setIsLoading, setMessage }) {
    const [showDesc, setShowDesc] = useState(false);
    //const { user, setUser } = useUserContext();
    const navigate = useNavigate();
    const timer = 3000;

    function mouseOver() {
        setShowDesc(true);
    }

    function mouseOut(){
        setShowDesc(false);
    }

    function addToFavorites() {
        /* if (user.token && !isLoading) {
            setIsLoading(true);
            const request = axios.post(`${API}/user/favorites`, { id: product._id }, { Headers: {
                "Authorization": `Bearer ${user.token}`
            }});
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
        } else if (!user.token) {
            setMessage("Não há usuário logado. Faça login agora!");
            setTimeout(() => {
                setMessage("");
                setIsLoading(false);
            }, timer);
        } else {
            setMessage("Botão desabilitado, aguarde!");
            setTimeout(() => {
                setMessage("");
                setIsLoading(false);
            }, timer);
        } */
        console.log("added to favorites");
    }

    return (
        <ProductContainer>
            <ProductFront display={showDesc ? "none" : "flex"} onMouseEnter={mouseOver}>
                <img src={product.image} onMouseEnter={mouseOver} />
                <ProductTitle>
                    <h1>{product.name}</h1>
                    <StyledIonIcon
                    icon={/*user.favorites.includes(product._id) ? heart :*/heartOutline}
                    color={/*user.favorites.includes(product._id) ? "red" :*/"black"} />
                </ProductTitle>
                <p>{product.currency_symbol} {product.price.toFixed(2)}</p>
            </ProductFront>
            <ProductBack display={showDesc ? "flex" : "none"} onMouseLeave={mouseOut}>
                <p>{product.description}</p>
                <ProductButtons>
                    <div>
                        <button onClick={() => navigate(`/products/${product._id}`)}>Ver mais detalhes</button>
                        <button onClick={() => console.log("added to cart")}>Comprar produto</button>
                    </div>
                    <StyledIonIcon
                    icon={/*user.favorites.includes(product._id) ? heart :*/heartOutline}
                    onClick={addToFavorites}
                    color={/*user.favorites.includes(product._id) ? "red" :*/"black"} />
                </ProductButtons>
            </ProductBack>
        </ProductContainer>
    )
}

const Container = styled.div`
    width: 1150px;
    height: fit-content;
    margin: 90px auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        width: 100%;
        font-size: 22px;
        font-weight: 700;
        text-align: left;
    }
`;

const SeparationBar = styled.div`
    width: 100%;
    margin-bottom: 15px;
    border-top: 1px solid var(--secondary-color);
`;

const ProductsBox = styled.div`
    width: 550px;
    height: fit-content;
    margin: 10px 0;

    h2 {
        width: 100%;
        font-size: 20px;
        font-weight: 600;
        text-align: center;
    }
`;

const Products = styled.div`
    width: 100%;
    height: 100%;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow-y: scroll;
`;

const ProductContainer = styled.div`
    min-width: 270px;
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
    justify-content; space-between;
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

const WarnModal = styled.div`
    width: 300px;
    height: 70px;
    background-color: red;
    border-radius: 10px;
    display: ${props => props.display};
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 15px;
    right: 15px;

    p {
        font-size: 18px;
        color: #FFFFFF;
    }
`;