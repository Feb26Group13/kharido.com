// import { useState } from "react";

// export default function AddProduct() {

//   const [product, setProduct] = useState({
//     categoryId: "",
//     subCategoryId: "",
//     brandId: "",
//     productName: "",
//     description: "",
//     price: "",
//     stockQuantity: "",
//     isPrimary: true,
//     image: null
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setProduct({
//       ...product,
//       [name]: value
//     });
//   };

//   const handleImageChange = (e) => {
//     setProduct({
//       ...product,
//       image: e.target.files[0]
//     });
//   };

//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     const formData = new FormData();

//     formData.append("categoryId", product.categoryId);
//     formData.append("subCategoryId", product.subCategoryId);
//     formData.append("brandId", product.brandId);
//     formData.append("productName", product.productName);
//     formData.append("description", product.description);
//     formData.append("price", product.price);
//     formData.append("stockQuantity", product.stockQuantity);
//     formData.append("isPrimary", product.isPrimary);

//     if (product.image) {
//       formData.append("image", product.image);
//     }

//     try {

//       const response = await fetch(
//         "http://localhost:8082/api/products",
//         {
//           method: "POST",
//           credentials: "include",
//           body: formData
//         }
//       );

//       console.log("Status :", response.status);

//       const data = await response.json();

//       console.log("Response :", data);

//       if (response.ok) {
//         alert("Product Added Successfully");
//       } else {
//         alert(data.message || "Failed");
//       }

//     } catch (err) {

//       console.log(err);
//       alert("Server Error");
//     }
//   };

//   return (

//     <div className="container mt-4">

//       <h2>Add Product</h2>

//       <form onSubmit={handleSubmit}>

//         <input
//           className="form-control mb-3"
//           placeholder="Category Id"
//           name="categoryId"
//           onChange={handleChange}
//         />

//         <input
//           className="form-control mb-3"
//           placeholder="Sub Category Id"
//           name="subCategoryId"
//           onChange={handleChange}
//         />

//         <input
//           className="form-control mb-3"
//           placeholder="Brand Id"
//           name="brandId"
//           onChange={handleChange}
//         />

//         <input
//           className="form-control mb-3"
//           placeholder="Product Name"
//           name="productName"
//           onChange={handleChange}
//         />

//         <textarea
//           className="form-control mb-3"
//           placeholder="Description"
//           name="description"
//           onChange={handleChange}
//         />

//         <input
//           className="form-control mb-3"
//           placeholder="Price"
//           name="price"
//           type="number"
//           onChange={handleChange}
//         />

//         <input
//           className="form-control mb-3"
//           placeholder="Stock Quantity"
//           name="stockQuantity"
//           type="number"
//           onChange={handleChange}
//         />

//         <input
//           className="form-control mb-3"
//           type="file"
//           onChange={handleImageChange}
//         />

//         <button className="btn btn-primary">
//           Add Product
//         </button>

//       </form>

//     </div>
//   );
// }
import { useEffect, useState } from "react";

export default function AddProduct() {

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [product, setProduct] = useState({
    categoryId: "",
    subCategoryId: "",
    brandId: "",
    productName: "",
    description: "",
    price: "",
    stockQuantity: "",
    isPrimary: true,
    image: null
  });

  // Load Categories
  useEffect(() => {
    fetch("http://localhost:8082/api/categories", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.log(err));
  }, []);

  // Load Brands
  useEffect(() => {
    fetch("http://localhost:8082/api/brands", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setBrands(data))
      .catch(err => console.log(err));
  }, []);

  // Load Sub Categories when Category changes
  useEffect(() => {

    if (!product.categoryId) {
      setSubCategories([]);
      return;
    }

    fetch(
      `http://localhost:8082/api/subcategories/${product.categoryId}`,
      {
        credentials: "include"
      }
    )
      .then(res => res.json())
      .then(data => setSubCategories(data))
      .catch(err => console.log(err));

  }, [product.categoryId]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setProduct(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const handleCategoryChange = (e) => {

    const value = e.target.value;

    setProduct(prev => ({
      ...prev,
      categoryId: value,
      subCategoryId: ""
    }));

  };

  const handleImageChange = (e) => {

    setProduct(prev => ({
      ...prev,
      image: e.target.files[0]
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("categoryId", product.categoryId);
    formData.append("subCategoryId", product.subCategoryId);
    formData.append("brandId", product.brandId);
    formData.append("productName", product.productName);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stockQuantity", product.stockQuantity);
    formData.append("isPrimary", product.isPrimary);

    if (product.image) {
      formData.append("image", product.image);
    }

    try {

      const response = await fetch(
        "http://localhost:8082/api/products",
        {
          method: "POST",
          credentials: "include",
          body: formData
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Product Added Successfully");

        setProduct({
          categoryId: "",
          subCategoryId: "",
          brandId: "",
          productName: "",
          description: "",
          price: "",
          stockQuantity: "",
          isPrimary: true,
          image: null
        });

      } else {

        alert(data.message || "Failed");

      }

    } catch (err) {

      console.log(err);
      alert("Server Error");

    }

  };

  return (

    <div className="container mt-4">

      <h2 className="mb-4">Add Product</h2>

      <form onSubmit={handleSubmit}>

        {/* Category */}

        <select
          className="form-select mb-3"
          name="categoryId"
          value={product.categoryId}
          onChange={handleCategoryChange}
          required
        >

          <option value="">Select Category</option>

          {categories.map(category => (

            <option
              key={category.categoryId}
              value={category.categoryId}
            >
              {category.categoryName}
            </option>

          ))}

        </select>

        {/* Sub Category */}

        <select
          className="form-select mb-3"
          name="subCategoryId"
          value={product.subCategoryId}
          onChange={handleChange}
          required
        >

          <option value="">Select Sub Category</option>

          {subCategories.map(sub => (

            <option
              key={sub.subCategoryId}
              value={sub.subCategoryId}
            >
              {sub.subCategoryName}
            </option>

          ))}

        </select>

        {/* Brand */}

        <select
          className="form-select mb-3"
          name="brandId"
          value={product.brandId}
          onChange={handleChange}
          required
        >

          <option value="">Select Brand</option>

          {brands.map(brand => (

            <option
              key={brand.brandId}
              value={brand.brandId}
            >
              {brand.brandName}
            </option>

          ))}

        </select>

        <input
          className="form-control mb-3"
          placeholder="Product Name"
          name="productName"
          value={product.productName}
          onChange={handleChange}
          required
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          type="number"
          placeholder="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          type="number"
          placeholder="Stock Quantity"
          name="stockQuantity"
          value={product.stockQuantity}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-4"
          type="file"
          onChange={handleImageChange}
          required
        />

        <button
          className="btn btn-primary w-100"
          type="submit"
        >
          Add Product
        </button>

      </form>

    </div>

  );

}