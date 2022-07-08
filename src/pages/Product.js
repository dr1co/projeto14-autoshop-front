import {useState} from "react";
import { useParams } from 'react-router-dom';
import BrandForm from "../components/BrandForm";

export default function Product() {
    const { productId } = useParams();
    const [isHidden, setIsHidden] = useState(true);

    return (
        <>
        <button onClick={()=> setIsHidden(false)}>Adicionar marca</button>
        {!isHidden && <BrandForm  setIsHidden={setIsHidden}/>}
            Product: {productId}
        </>
    )
}