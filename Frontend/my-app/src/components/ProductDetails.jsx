import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails(){

    const { id } = useParams();

    const [product,setProduct] = useState(null);

    useEffect(()=>{

        fetch(`http://localhost:3000/product/${id}`)
        .then(resp=>resp.json())
        .then(data=>setProduct(data));

    },[id]);

    if(!product){
        return <h2>Loading...</h2>;
    }

    return(
        <>
            <h1>{product.product_name}</h1>

            <p>{product.description}</p>

            <h3>₹ {product.price}</h3>
        </>
    );
}