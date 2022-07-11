import axios from 'axios';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from "../components/layouts/Header.js";
import { useIsLoadingContext } from '../contexts/IsLoadingContext';
import { useUserContext } from '../contexts/UserContext.js';
import { ThreeDots } from 'react-loader-spinner';
import { API } from '../API.js';
import { IonIcon } from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';

export default function Checkout() {
    const [total, setTotal] = useState(0);
    const { user } = useUserContext();
    const [userCart, setUserCart] = useState([...user.cart]);
    const navigate = useNavigate();

    function calculateTotal(cart) {
        let sum = 0;
        for (let i = 0; i < cart.length ; i++) {
            sum += Number(cart[i].price)*cart[i].quantity;
        }
        setTotal(sum);
    }

    useEffect(() => {
        calculateTotal(userCart);
    }, [userCart]);

    return (
        <>
            <Header />
            <Container>
                <CartContainer>
                    {userCart.map(p => <Product product={p} cart={userCart} setCart={setUserCart} />)}
                    <TotalPrice display={total === 0 ? "none" : "flex"}>
                        <h1>TOTAL:</h1>
                        <p>R${total.toFixed(2)}</p>
                    </TotalPrice>
                    <EmptyCart display={total === 0 ? "flex" : "none"}>
                        <Message />
                        <button onClick={() => navigate("/home")}>Voltar para as compras</button>
                    </EmptyCart>
                </CartContainer>
                <Payment cart={userCart} auth={user.auth} />
            </Container>
        </>
    )
}

function Message({ isLoading }) {
    if (isLoading) {
        return (
            <p>Carregando carrinho... </p>
        )
    } else {
        return (
            <p> Não há nenhum produto cadastrado no carrinho, <StyledLink to={"/login"}>faça login</StyledLink> ou volte às compras!</p>
        )
    }
}

function Payment({ cart, auth }) {
    const [success, setSuccess] = useState(false);
    const { isLoading, setIsLoading } = useIsLoadingContext();
    const [card, setCard] = useState({
        name: "",
        number: "",
        expDate: "",
        code: "",
        cpf: ""
    })

    function buyNow() {
        if(card.name && card.number && card.cpf && card.expDate && card.code) {
            const request = axios.post(`${API}/products/buy`, cart, auth)
            request.then(() => {
                setSuccess(true);
            })
            request.catch((err) => {
                console.log(err.response);
            })
        }
    }

    function setCpf(value) {
        if (value.length > card.cpf.length) {
            let rawValue = value.replaceAll(".", "").replace("-", "");
            for (let i = 3; i < rawValue.length && i < 10; i += 4) {
                rawValue = [rawValue.slice(0, i), ".", rawValue.slice(i)].join('');
            }
            if (rawValue.length >= 11) {
                rawValue = [rawValue.slice(0, 11), "-", rawValue.slice(11)].join('');
            }
            setCard({
                ...card,
                cpf: rawValue.slice(0, 14)
            });
        } else {
            setCard({
                ...card,
                cpf: value
            });
        }
    }

    function setCardNumber(value) {
        if (value.length > card.number.length) {
            let rawValue = value.replaceAll("-", "");
            for (let i = 4 ; i < rawValue.length ; i+=5) {
                rawValue = [rawValue.slice(0, i), "-", rawValue.slice(i)].join('');
            }
            setCard({
                ...card,
                number: rawValue.slice(0, 19)
            });
        } else {
            setCard({
                ...card,
                number: value
            });
        }
    }

    function setExpDate(value) {
        if (value.length > card.expDate.length) {
            let rawValue = value.replace("/", "");
            if (rawValue.length >= 2) {
                rawValue = [rawValue.slice(0, 2), "/", rawValue.slice(2)].join('');    
            }
            setCard({
                ...card,
                expDate: rawValue.slice(0, 5)
            });
        } else {
            setCard({
                ...card,
                expDate: value
            })
        }
    }

    function setCode(value) {
        setCard({
            ...card,
            code: value.slice(0, 3)
        })
    }

    return (
        <CheckoutContainer>
            <CheckoutForm>
                <h1>Nome Completo</h1>
                <Input
                    type="text"
                    placeholder="Seu nome aqui"
                    value={card.name}
                    onChange={(e) => setCard({ ...card, name: e.target.value })} />
                <h1>Número do cartão</h1>
                <Input
                    type="text"
                    placeholder="0000-0000-0000-0000"
                    value={card.number}
                    onChange={(e) => setCardNumber(e.target.value)} />
                <Row>
                    <Column>
                        <h1>CPF</h1>
                        <Input
                            type="text"
                            placeholder="000.000.000-00"
                            value={card.cpf}
                            onChange={(e) => setCpf(e.target.value)} />
                    </Column>
                    <Column>
                        <h1>Data de validade</h1>
                        <Input
                            type="text"
                            placeholder="MM/AA"
                            value={card.expDate}
                            onChange={(e) => setExpDate(e.target.value)} />
                    </Column>
                    <Column>
                        <h1>Código de Segurança</h1>
                        <Input
                            type="number"
                            placeholder="000"
                            value={card.code}
                            onChange={(e) => setCode(e.target.value)} />
                    </Column>
                </Row>
            </CheckoutForm>
            <BuyButton
                disabled={(card.name && card.number && card.cpf && card.expDate && card.code) ? true : false}
                cursor={(card.name && card.number && card.cpf && card.expDate && card.code) ? "pointer" : "default"}
                color={(card.name && card.number && card.cpf && card.expDate && card.code) ? "lightgreen" : "green"}>
                    {!isLoading ? <ThreeDots /> : (success ? <IonIcon icon={checkmarkCircle} /> : "Comprar agora!")}
            </BuyButton>
        </CheckoutContainer>
    )
}

function Product({ product, cart, setCart }) {

    function addOne() {
        const newCart = [...cart];
        const newQuantity = product.quantity + 1;
        const index = newCart.findIndex((p) => p._id === product._id);
        newCart[index] = {
            ...product,
            quantity: newQuantity
        }
        setCart(newCart);
    }

    function removeOne() {
        if (product.quantity > 1) {
            const newCart = [...cart];
            const newQuantity = product.quantity - 1;
            const index = newCart.findIndex((p) => p._id === product._id);
            newCart[index] = {
                ...product,
                quantity: newQuantity
            }
            setCart(newCart);
        }
    }

    return (
        <ProductContainer>
            <img src={product.image} alt="imagem do produto " />
            <h2>{product.name}</h2>
            <h3>
                Quantidade: {product.quantity}
                <AddButton onClick={addOne}>+</AddButton>
                <RemoveButton
                onClick={removeOne}
                disabled={product.quantity === 1 ? true : false}
                color={product.quantity === 1 ? "darkred" : "red"}>-</RemoveButton>
            </h3>
            <h4>Subtotal: <strong>{product.currency_symbol}{(Number(product.price)*product.quantity).toFixed(2)}</strong></h4>
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

const CartContainer=styled.div`
    width: 100%;
    height: fit-content;
    padding: 15px;
    background: #FFFFFF;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
    border-radius: 10px;
`;

const ProductContainer = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        margin: 0 10px 0 0;
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
    }

    h2 {
        min-width: 55%;
        font-size: 18px;
        font-weight: 600;
        color: #000000;
        text-align: left;
    }

    h3 {
        min-width: 20%;
        font-size: 18px;
        color: #4F4F4F;
        text-align: right;
    }

    h4 {
        min-width: 20%;
        font-size: 18px;
        color: #000000;
        text-align: right;
        
        strong {
            font-weight: 600;
        }
    }
`;

const TotalPrice = styled.div`
    width: 100%;
    height: 80px;
    margin-top: 10px;
    border-top: 1px solid var(--primary-color);
    display: ${props => props.display};
    justify-content: center;
    align-items: center;

    h1 {
        width: 80%;
        font-size: 22px;
        font-weight: 700;
        color: #000000;
        text-align: left;
    }

    p {
        width: 20%;
        font-size: 22px;
        font-weight: 700;
        color: #00A323;
        text-align: right;
    }
`;

const EmptyCart = styled.div`
    width: 100%;
    height: 80px;
    display: ${props => props.display};
    justify-content: center;
    align-items: center;

    p {
        width: 70%;
        font-size: 20px;
        font-weight: 600;
        color: #000000;
        text-align: center;
        word-wrap: break-word;
    }

    button {
        width: 30%;
        height: 50px;
        background: var(--secondary-color);
        color: #FFFFFF;
        border: 0 solid transparent;
        border-radius: 25px;
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
    }
`;

const AddButton = styled.button`
    width: 20px;
    height: 30px;
    margin-left: 10px;
    border: 0 solid transparent;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background: lightgreen;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
`;

const RemoveButton = styled.button`
    width: 20px;
    height: 30px;
    border: 0 solid transparent;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background: ${props => props.color};
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
`;

const CheckoutContainer = styled.div`
    width: 100%;
    margin: 40px auto 0 auto;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    justify-content; center;
    align-items: center;

    h1 {
        font-size: 18px;
    }
`;

const CheckoutForm = styled.div`
    width: 65%;
    padding-right: 15px;
    border-right: 1px solid var(--secondary-color);
`;

const Input = styled.input`
    width: 100%;
    height: 42px;
    margin-bottom: 15px;
    margin-top: 5px;
    padding: 10px;
    border: 1px solid var(--primary-color);
    border-radius: 21px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const BuyButton = styled.button`
    width: 30%;
    height: 180px;
    margin-left: 15px;
    border: 0 solid transparent;
    border-radius: 10px;
    background: ${props => props.color};
    font-size: 24px;
    font-weight: 700;
    color: #FFFFFF;
    cursor: ${props => props.cursor};
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: red;
    cursor: pointer;
`;