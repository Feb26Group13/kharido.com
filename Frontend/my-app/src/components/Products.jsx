import React from "react";
import laptop from "../assets/laptop.jpg";
import mobile from "../assets/mobile.jpg";
import headphone from "../assets/headphone.jpg";

function Products() {
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: "₹70,000",
       image: laptop
    },
    {
      id: 2,
      name: "Mobile",
      price: "₹60,000",
       image: mobile
    },
    {
      id: 3,
      name: "Headphones",
      price: "₹2,000",
       image: headphone
    }
  ];

  return (
    <section className="products">
      <h2>Featured Products</h2>

      <div className="product-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">

            <img
              src={product.image}
              alt={product.name}
            />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;