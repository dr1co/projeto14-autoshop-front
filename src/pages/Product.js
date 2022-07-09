import axios from 'axios';
import styled from 'styled-components';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import Header from '../components/layouts/Header.js';
import { API } from '../API';

export default function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState({
        _id: "123abc",
        name: "produto genérico",
        currency_symbol: "R$",
        description: "top 10 descrições fodas",
        price: 150000.00,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvL0IRqYEf-WlS_7pMLtSejxZ8HwhJAR9BwgfoQ1gdbY1GTLXFnyyevS8j138pyM96Hak&usqp=CAU",
        categoryId: "addon",
        brandId: "Uma marca genérica",
        sku: "cod1001"
    });
    const [message,setMessage] = useState("");

    useEffect(() => {
        const promise = axios.get(`${API}/products/${productId}`);
        promise.then((res) => {
            setProduct(res.data);
        });
        promise.catch((err) => {
            console.log(err.response);
        });
    }, []);

    function addToCart() {
        console.log("oi");
    }

    return (
        <>
            <Header />
            <Container>
                <Image>
                    <img src={product.image} />
                </Image>
                <InfoContainer>
                    <h1>{product.name}</h1>
                    <h2>Descrição:</h2>
                    <h3>{product.description}</h3>
                    <Grid>
                        <Row>
                            <p><strong>Marca: </strong>{product.brandId}</p>
                            <p><strong>Categoria: </strong>{product.categoryId === "vehicle" ? "Veículo" : "Acessório"}</p>
                        </Row>
                        <Row>
                            <p><strong>Código do produto: </strong>{product.sku}</p>
                            <p><strong>Preço: </strong>{product.currency_symbol}{product.price.toFixed(2)}</p>
                        </Row>
                        <BuyNow onClick={addToCart}>Adicionar ao carrinho</BuyNow>
                    </Grid>
                </InfoContainer>
            </Container>
        </>
    )
}

const Container = styled.div`
    width: 1150px;
    height: 510px;
    margin: 110px auto;
    border-radius: 10px;
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
`;

const Image = styled.div`
    width: 685px;
    height: 560px;
    background: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    position: absolute;
    top: 100px;

    img {
        width: 675px;
        height: 550px;
        object-fit: cover;
        border-radius: 8px;
    }
`;

const InfoContainer = styled.div`
    width: 100%;
    margin: 10px;
    padding: 0 0 0 685px;

    h1 {
        width: 100%;
        font-size: 26px;
        font-weight: 700;
        text-align: left;
        margin-bottom: 30px;
    }

    h2 {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 5px;
    }

    h3 {
        width: 100%;
        min-height: 280px;
        max-height: 280px;
        font-size: 18px;
        text-align: justify;
        text-overflow: ellipsis;
    }

    strong {
        font-weight: 700;
    }
`;

const Grid = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    p {
        font-size: 16px;
        margin: 5px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--primary-color);
        color: #FFFFFF;
        padding: 7px;
        border-radius: 15px;
    }
`;

const Row = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BuyNow = styled.button`
    width: 100%;
    height: 40px;
    margin-top: 5px;
    border: 0 solid transparent;
    border-radius: 20px;
    font-size: 18px;
    font-weight: 700;
    background: lightgreen;
    cursor: pointer;
`;