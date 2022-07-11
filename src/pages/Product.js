import axios from 'axios';
import styled from 'styled-components';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Header from '../components/layouts/Header.js';
import { API } from '../API';
import { useUserContext } from '../contexts/UserContext';
import { useIsLoadingContext } from '../contexts/IsLoadingContext';
import WarnModal from '../components/shared/WarnModal.js';
import { ThreeDots } from 'react-loader-spinner';
import { NoProduct, ProductCard } from '../components/shared/ProductCard.js';
import { IonIcon } from "@ionic/react";
import { heartOutline, heart } from "ionicons/icons";

export default function Product() {
    const { user, setUser } = useUserContext();
    const { isLoading, setIsLoading } = useIsLoadingContext();
    const { productId } = useParams();
    const [product, setProduct] = useState("");
    const [products, setProducts] = useState([]);
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    const timer = 3000;

    useEffect(() => {
        if (productId) {
            setIsLoading(true);
            const promise = axios.get(`${API}/products/${productId}`);
            promise.then((res) => {
                setProduct(res.data);
                setIsLoading(false);
            });
            promise.catch((err) => {
                console.log(err.response);
                setIsLoading(false);
            });
        } else {
            setProduct("");
        }
    }, []);

    useEffect(() => {
        if (product.category) {
            setIsLoading(true);
            const promise = axios.get(`${API}/products`);
            promise.then((res) => {
                setProducts(res.data);
                setIsLoading(false);
            });
            promise.catch((err) => {
                console.log(err.response);
                setIsLoading(false);
            })
        }
    }, [product.category]);

    function addToCart() {
        if (user.token && !isLoading) {
            setIsLoading(true);
            const request = axios.post(`${API}/user/cart`, { id: productId }, user.auth);
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
        } else if (!user.token) {
            setMessage("Usuário não encontrado, faça login!");
            setTimeout(() => {
                setMessage("");
                navigate("/login");
            }, timer);
        } else if (!message) {
            setMessage("Botão está desabilitado, aguarde!");
            setTimeout(() => {
                setMessage("");
            }, timer);
        } 
        console.log("added to cart");
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
        } else if (!message) {
            setMessage("Botão desabilitado, aguarde!");
            setTimeout(() => {
                setMessage("");
            }, timer);
        } */
        console.log("added to favorites");
    }

    return (
        <>
            <Header />
            <Container>
                <Image display={product && !isLoading ? "flex" : "none"}>
                    <img src={product.image} />
                </Image>
                <Image display={(isLoading && !product) || !product ? "flex" : "none"}>
                    <div>{!product ? "404: Produto não encontrado" : <ThreeDots />}</div>
                </Image>
                <InfoContainer>
                    <ProductTitle>
                        <h1>{product.name ? product.name : "404 não encontrado"}</h1>
                        <StyledIonIcon onClick={addToFavorites}
                        icon={/*user.favorites.includes(product._id) ? heart :*/heartOutline}
                        color={/*user.favorites.includes(product._id) ? "red" :*/"black"} />
                    </ProductTitle>
                    <h2>Descrição:</h2>
                    <h3>{product.description ? product.description : "Produto não encontrado. Retorne à página principal!"}</h3>
                    <Grid>
                        <Row>
                            <p><strong>Marca: </strong>{product.brand ? product.brand : "404"}</p>
                            <p><strong>Categoria: </strong>{product.category === "vehicle" ? "Veículo" :
                            ( product.category ? "Acessório" : "404 não encontrado")}</p>
                        </Row>
                        <Row>
                            <p><strong>Código do produto: </strong>{product.sku ? product.sku : "404 não encontrado"}</p>
                            <p><strong>Preço: </strong>{product.currency_symbol ? product.currency_symbol : "?"}
                            {product.price ? product.price.toFixed(2) : "NaN"}</p>
                        </Row>
                        <BuyNow onClick={addToCart}>Adicionar ao carrinho</BuyNow>
                    </Grid>
                </InfoContainer>
                <WarnModal display={message ? "flex" : "none"} message={message} />
            </Container>
            <ProductsBox>
            <h1>Produtos de mesma categoria:</h1>
                <Products justify={products.length === 0 ? "center" : "start"}>
                    {isLoading && products.length === 0 ? <ThreeDots /> :
                    (products.length === 0 ? <NoProduct /> :
                    products.reverse().map(p => <ProductCard
                    key={p._id}
                    product={p}
                    message={message}
                    setMessage={setMessage} />))}
                </Products>
            </ProductsBox>
        </>
    )
}

const Container = styled.div`
    width: 1150px;
    height: 510px;
    margin: 110px auto 0 auto;
    border-radius: 10px;
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
`;

const Image = styled.div`
    width: 685px;
    height: 560px;
    background: #FFFFFF;
    display: ${props => props.display};
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

    div {
        min-width: 675px;
        min-height: 550px;
        border-radius: 8px;
        font-size: 20px;
        color: var(--secondary-color);
        border: 2px dashed var(--primary-color);
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const InfoContainer = styled.div`
    width: 100%;
    margin: 10px;
    padding: 0 0 0 685px;

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

const ProductTitle = styled.span`
    width: 100%;
    margin: 12px auto;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
        width: 100%;
        font-size: 26px;
        font-weight: 700;
        text-align: left;
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

const ProductsBox = styled.div`
    width: 1150px;
    height: fit-content;
    margin: 50px auto;
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

const Products = styled.div`
    width: 1150px;
    min-height: 320px;
    margin: 10px auto;
    display: flex;
    justify-content: ${props => props.justify};
    align-items: center;
    overflow-y: scroll;
`;

const StyledIonIcon = styled(IonIcon)`
    font-size: 25px;
    cursor: pointer;
    color: ${props => props.color};
`;