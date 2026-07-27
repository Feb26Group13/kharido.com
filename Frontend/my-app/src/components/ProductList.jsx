import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        fetch("http://localhost:3000/products")
            .then(resp => resp.json())
            .then(data => setProducts(data));

    }, []);

    return (
        <>
            <h1>Products</h1>

            {
                products.map(p =>

                    <div
                        key={p.productid}
                        style={{
                            border: "1px solid gray",
                            padding: "15px",
                            margin: "10px"
                        }}
                    >
                        <Link to={`/product/${p.productid}`}>
                            <h3>{p.product_name}</h3>
                        </Link>

                        <p>{p.description}</p>

                        <p>Brand : {p.brand_name}</p>

                        <p>Category : {p.category_name}</p>

                        <p>Price : ₹{p.price}</p>

                    </div>

                )
            }

        </>
    );
}