import axios from "axios";
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from "../components/layouts/Header.js";
import { FlexContainer } from "../components/styles/FlexContainer.js";
import { useUserContext } from "../contexts/UserContext.js";
import { IonIcon } from "@ionic/react";
import { heartOutline } from "ionicons/icons";

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
    ])

    return(
        <>
            <Header />
            <Container>
                <h1>Lançamentos Recentes</h1>
                <Products justify="space-between" align="center">
                    {products.map(p => <Product product={p} />)}
                </Products>
                <SeparationBar />
                <h1>Todos os Produtos</h1>
                <FlexContainer justify="space-between" align="center">
                    <ProductsBox>
                        <h2>Veículos</h2>
                        <Products>
                            
                        </Products>
                    </ProductsBox>
                    <ProductsBox>
                        <h2>Acessórios</h2>
                        <Products>
                            
                        </Products>
                    </ProductsBox>
                </FlexContainer>
            </Container>
        </>
    );
}

function Product({ product }) {
    const [showDesc, setShowDesc] = useState(false);

    return (
        <ProductContainer>
            <ProductFront display={showDesc ? "none" : "flex"} onMouseEnter={() => setShowDesc(true)} onMouseLeave={() => setShowDesc(false)}>
                <img src={product.image} />
                <ProductTitle>
                    <h1>{product.name}</h1>
                    <IonIcon icon={heartOutline} />
                </ProductTitle>
                <p>{product.currency_symbol} {product.price.toFixed(2)}</p>
            </ProductFront>
            <ProductBack display={showDesc ? "flex" : "none"}>
                {product.description}
                <button onClick={() => console.log("oi")}>Ver mais detalhes</button>
            </ProductBack>
        </ProductContainer>
    )
}

const Container = styled.div`
    width: 950px;
    height: fit-content;
    margin: 90px auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
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
    width: 425px;
    height: fit-content;
    margin: auto 10px;

    h2 {
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
    min-width: 180px;
    height: 200px;
    margin: 10px;
    background: #FFFFFF;
    border: 1px solid var(--primary-color);
    border-radius: 10px;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
    position: relative;
    cursor: pointer;
`;

const ProductFront = styled.div`
    display: ${props => props.display};
    flex-direction: column;
    justify-content; space-between;
    align-items: center;

    img {
        width: 100%;
        min-height: 110px;
        max-height: 110px;
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
    }
`;

const ProductTitle = styled.span`
    width: 100%;
    margin: 10px auto;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-size: 18px;
        font-weight: 700;
        text-align: left;
    }
`;

const ProductBack = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    color: #000000;
    display: ${props => props.display};
    position: absolute;
    top: 0;
    left: 0;
    justify-content: space-around;
    align-items: center;
`;