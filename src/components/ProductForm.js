import { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonForm from "./shared/ButtonForm";
import Form from "./shared/Form";
import Input from "./shared/Input";
import { FlexContainer } from "./styles/FlexContainer";

function Select({ setValue, value,text, name, result = [], options }) {
  const error = result && result.find(r => r.label === name)
  return (
    <FlexContainer direction={"column"} >
      <StyledSelect value={!value ? text : value} name={"category"} onChange={(e) => e.target.value && setValue(e.target.value)}>
        <option value={text} disabled>{text}</option>
        {options && options.map(option => <option value={option}>{option}</option>)}
      </StyledSelect>
      {error && <ErrorSpan>{error.text}</ErrorSpan>}
    </FlexContainer>
  );
}

const StyledSelect = styled.select`
    width: 100%;
    height: 50px;
    border: 2px solid ${({ color }) => color ? color : "var(--primary-color)"};
    border-radius: 25px;
    padding: 15px;
    font-size: 18px;
`;

const ErrorSpan = styled.span`
    font-family: 'Inter', sans-serif;
    margin-top: 5px;
    color: red;
    font-size: 10px;
`;

const brands=["Audi" , "BMW" , "Chery" , "Chevrolet" , "Citroën" , "Fiat" , "Ford" , "Honda" , "Hyundai" , "Jeep" , "Mercedes-Benz" , "Mitsubishi" , "Nissan" , "Peugeot" , "Renault" , "Suzuki" , "Toyota" , "Volkswagen"];
const categories=['Veiculo', 'Acessório'];

export default function ProductForm({ setIsHidden }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [currency_symbol, setCurrency] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sku, setSku] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (name && image) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, image]);

  const body = {
    name,
    currency_symbol,
    description,
    price,
    image,
    category,
    brand,
    sku
  }

  function validate(result) {
    if (result.status === 201) {
      setTimeout(() => setIsHidden(true), 3000)
    }
    setResult(result.data);
  }
  return (
    <BackgroundOverlay onClick={() => setIsHidden(true)}>
      <FlexContainer onClick={e => e.stopPropagation()} width={"326px"}  direction={"column"} justify={"center"} align={"center"}>
        <Title>Cadastrar novo produto</Title>
        <Form endpoint={"/product"} action={validate} body={body} auth={true}>
          <Input text={"Nome"} name={"name"} setValue={setName} value={name} result={result} />
          <Input text={"Descrição"} name={"description"} setValue={setDescription} value={description} result={result} />
          <Input text={"Price"} name={"price"} setValue={setPrice} value={price} result={result} />
          <Input text={"Moeda"} name={"currency_symbol"} setValue={setCurrency} value={currency_symbol} result={result} />
          <Input text={"Imagem"} name={"image"} setValue={setImage} value={image} result={result} />
          <Select text={"Selecione uma categoria"} options={categories} name={"category"} setValue={setCategory} value={category} result={result} />
          <Select text={"Selecione uma marca"} options={brands} name={"brand"} setValue={setBrand} value={brand} result={result} />
          <Input text={"SKU"} name={"sku"} setValue={setSku} value={sku} result={result} />
          <ButtonForm text={"Cadastrar"} isDisabled={isDisabled} />
        </Form>
      </FlexContainer>
    </BackgroundOverlay>
  );
}

const BackgroundOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  bottom:0;

  background-color: rgba(0, 0, 0,  0.3);
`;

const Title = styled.span`
    font-size: 22px;
    font-weight: 600;
    color: black;
    margin-bottom: 20px;
`;