import { useState } from "react";
import ProductForm from "../ProductForm";
import AddProductButton from "../shared/AddProductButton";

export default function Header() {
    const [isHidden, setIsHidden] = useState(true);
    return (
        <>
            <AddProductButton onClick={setIsHidden} />
            {!isHidden && <ProductForm setIsHidden={setIsHidden} />}
            Header
        </>
    )
}