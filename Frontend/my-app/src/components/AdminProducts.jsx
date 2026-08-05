import { useEffect, useState } from "react";


function AdminProducts() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);



    const loadProducts = async () => {

        try {

            setLoading(true);
            setError("");


            const response = await fetch(
                "http://localhost:8082/api/admin/products",
                {
                    credentials: "include"
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Unable to fetch products"
                );

            }


            const data = await response.json();


            console.log(
                "PRODUCT DATA = ",
                data
            );


            setProducts(data);



        } catch(error) {


            console.error(error);

            setError(
                "Unable to load products"
            );


        } finally {


            setLoading(false);

        }

    };



    useEffect(()=>{

        loadProducts();

    },[]);




    const approveProduct = async(id)=>{


        try {


            const response = await fetch(

                `http://localhost:8082/api/admin/products/${id}/approve`,

                {
                    method:"PUT",
                    credentials:"include"
                }

            );


            if(!response.ok){

                throw new Error(
                    "Approve failed"
                );

            }


            loadProducts();



        }catch(error){


            console.error(error);

            setError(
                "Unable to approve product"
            );


        }


    };




    const rejectProduct = async(id)=>{


        try {


            const response = await fetch(

                `http://localhost:8082/api/admin/products/${id}/reject`,

                {
                    method:"PUT",
                    credentials:"include"
                }

            );


            if(!response.ok){

                throw new Error(
                    "Reject failed"
                );

            }


            loadProducts();



        }catch(error){


            console.error(error);

            setError(
                "Unable to reject product"
            );


        }


    };





    const deleteProduct = async(id)=>{


        if(!window.confirm("Delete this product?")){

            return;

        }



        try{


            const response = await fetch(

                `http://localhost:8082/api/admin/products/${id}`,

                {
                    method:"DELETE",
                    credentials:"include"
                }

            );



            if(!response.ok){

                throw new Error(
                    "Delete failed"
                );

            }



            loadProducts();



        }catch(error){


            console.error(error);

            setError(
                "Unable to delete product"
            );


        }


    };





    return (

        <div className="container mt-4">


            <h2>
                Product Management
            </h2>


            <h5>
                Total Products : {products.length}
            </h5>



            {
                error &&

                <div className="alert alert-danger">

                    {error}

                </div>

            }



            {
                loading ?

                <h5>
                    Loading products...
                </h5>


                :



                <table className="table table-bordered table-hover">


                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Name</th>
                            <th>Seller</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Approval</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>


                    </thead>




                    <tbody>


                    {
                        products.length===0 &&

                        <tr>

                            <td colSpan="8"
                            className="text-center">

                                No Products Found

                            </td>

                        </tr>

                    }





                    {
                        products.map(product=>(


                            <tr key={product.productId}>


                                <td>
                                    {product.productId}
                                </td>


                                <td>
                                    {product.productName}
                                </td>


                                <td>
                                    {product.sellerName}
                                </td>


                                <td>
                                    ₹{product.price}
                                </td>


                                <td>
                                    {product.stockQuantity}
                                </td>



                                <td>


                                    <span
                                    className={
                                        product.approvalStatus==="APPROVED"

                                        ?

                                        "badge bg-success"

                                        :

                                        product.approvalStatus==="REJECTED"

                                        ?

                                        "badge bg-danger"

                                        :

                                        "badge bg-warning text-dark"
                                    }>


                                    {product.approvalStatus}


                                    </span>


                                </td>




                                <td>


                                    <span
                                    className="badge bg-success">

                                    {product.status}

                                    </span>


                                </td>





                                <td>


                                    <button

                                    className="btn btn-success btn-sm me-2"

                                    disabled={
                                        product.approvalStatus==="APPROVED"
                                    }

                                    onClick={()=>
                                        approveProduct(
                                            product.productId
                                        )
                                    }>

                                    Approve

                                    </button>





                                    <button

                                    className="btn btn-warning btn-sm me-2"

                                    disabled={
                                        product.approvalStatus==="REJECTED"
                                    }

                                    onClick={()=>
                                        rejectProduct(
                                            product.productId
                                        )
                                    }>

                                    Reject

                                    </button>





                                    <button

                                    className="btn btn-danger btn-sm"

                                    onClick={()=>
                                        deleteProduct(
                                            product.productId
                                        )
                                    }>

                                    Delete

                                    </button>



                                </td>


                            </tr>


                        ))
                    }


                    </tbody>



                </table>


            }



        </div>

    );


}


export default AdminProducts;