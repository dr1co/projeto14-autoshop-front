import axios from "axios";
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { API } from '../API';
import Header from "../components/layouts/Header.js";
import { FlexContainer } from "../components/styles/FlexContainer.js";
import { useUserContext } from "../contexts/UserContext.js";
import { useIsLoadingContext } from "../contexts/IsLoadingContext.js";
import WarnModal from "../components/shared/WarnModal";
import { ThreeDots } from "react-loader-spinner";
import { ProductCard, NoProduct } from "../components/shared/ProductCard";

export default function Home (){
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");
    const { isLoading, setIsLoading } = useIsLoadingContext();

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
                <Products justify={products.length === 0 ? "center" : "start"}>
                    {isLoading && products.length === 0 ? <ThreeDots /> :
                    (products.length === 0 ? <NoProduct /> :
                    products.reverse().map(p => <ProductCard
                    key={p._id}
                    product={p}
                    message={message}
                    setMessage={setMessage} />))}
                </Products>
                <SeparationBar />
                <h1>Todos os Produtos</h1>
                <FlexContainer justify="space-between" align="center">
                    <ProductsBox>
                        <h2>Veículos</h2>
                        <Products justify={products.filter(p => p.categoryId === "vehicle").length === 0 ? "center" : "start"}>
                            {isLoading && products.filter(p => p.categoryId === "vehicle").length === 0 ? <ThreeDots /> :
                            (products.filter(p => p.categoryId === "vehicle").length === 0 ? <NoProduct /> :
                            products.filter(p => p.categoryId === "vehicle").map(p => <ProductCard
                                key={p._id}
                                product={p}
                                message={message}
                                setMessage={setMessage} />))}
                        </Products>
                    </ProductsBox>
                    <ProductsBox>
                        <h2>Acessórios</h2>
                        <Products justify={products.filter(p => p.categoryId === "addon").length === 0 ? "center" : "start"}>
                            {isLoading && products.filter(p => p.categoryId === "addon").length === 0 ? <ThreeDots /> :
                            (products.filter(p => p.categoryId === "addon").length === 0 ? <NoProduct /> :
                            products.filter(p => p.categoryId === "addon").map(p => <ProductCard
                            key={p._id}
                            product={p}
                            message={message}
                            setMessage={setMessage} />))}
                        </Products>
                    </ProductsBox>
                </FlexContainer>
            <WarnModal display={message ? "flex" : "none"} message={message} />
            </Container>
        </>
    );
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
    min-height: 320px;
    margin: 10px auto;
    display: flex;
    justify-content: ${props => props.justify};
    align-items: center;
    overflow-y: scroll;
`;