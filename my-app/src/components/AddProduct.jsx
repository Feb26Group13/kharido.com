import { useState } from "react";
import { useSelector } from "react-redux";

export default function AddProduct() {

    // const [product, setProduct] = useState({
    //     product_name: "",
    //     category: "",
    //     price: "",
    //     description: "",
    //     image: null
    // });

    const [product, setProduct] = useState({
    // sellerid: loginState.user.userid,
    product_name: "",
    category: "",
    price: "",
    description: "",
    image_url: ""
});

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setProduct({
            ...product,
            image: e.target.files[0]
        });
    };

   const handleSubmit = (e) => {
    e.preventDefault();

   fetch("http://localhost:3000/add-product",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(product)
})
.then(async resp => {
    const data = await resp.json();
    alert(data.message);
})
.catch(err => {
    console.log(err);
});
};

    return (
        <div className="container mt-4">

            <h2>Add Product</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="product_name"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Product Category
                    </label>
                    <input
                        type="text"
                        name="category"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Product Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Product Description
                    </label>
                    <textarea
                        name="description"
                        className="form-control"
                        rows="4"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Product Image
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleImageChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Add Product
                </button>

            </form>

        </div>
    );
}