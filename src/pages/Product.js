import axios from 'axios';
import styled from 'styled-components';
import {useState} from "react";
import { useParams } from 'react-router-dom';

import BrandForm from "../components/BrandForm";
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
    const [isHidden, setIsHidden] = useState(true);

    useState(() => {
        const promise = axios.get(`${API}/products/${productId}`);
        promise.then((res) => {
            setProduct(res.data);
        });
        promise.catch((err) => {
            console.log(err.response);
        });
    }, []);

    return (
        <>
            <Header />
            <Container>
                {/*<button onClick={() => setIsHidden(false)}>Adicionar marca</button>
                {!isHidden && <BrandForm setIsHidden={setIsHidden} />}*/}
                <img src={product.image} />
                Product: {productId}
            </Container>
        </>
    )
}

const Container = styled.div`
    width: 1150px;
    height: fit-content;
    margin: 90px auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 710px;
        height: 660px;
        object-fit: cover;
    }

    h1 {
        width: 100%;
        font-size: 22px;
        font-weight: 700;
        text-align: left;
    }
`;