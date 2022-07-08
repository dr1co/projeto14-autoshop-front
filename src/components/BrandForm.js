import { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonForm from "./shared/ButtonForm";
import Form from "./shared/Form";
import Input from "./shared/Input";
import { FlexContainer } from "./styles/FlexContainer";

export default function BrandForm({ setIsHidden }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
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
    image
  }

  function validate(result) {
    if (result.status === 201) {
      setTimeout(() => setIsHidden(true), 3000)
    }
    setResult(result.data);
  }
  return (
    <BackgroundOverlay onClick={() => setIsHidden(true)}>
      <FlexContainer direction={"column"} justify={"center"} align={"center"}>
        <Title>Cadastrar nova marca</Title>
        <Form endpoint={"/product/brand"} action={validate} body={body}>
          <Input text={"Nome"} name={"name"} setValue={setName} value={name} result={result} />
          <Input text={"Imagem"} name={"image"} setValue={setImage} value={image} result={result} />
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
  top:0;
  background-color: rgba(0, 0, 0,  0.3);
`;

const Title = styled.span`
    font-size: 22px;
    font-weight: 600;
    color: black;
    margin-bottom: 20px;
`;