import { useEffect, useState } from "react";


function AdminOrders() {


    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");





    const loadOrders = async () => {


        try {


            setLoading(true);
            setError("");



            const response = await fetch(

                "http://localhost:8082/api/admin/orders",

                {
                    credentials: "include"
                }

            );



            if (!response.ok) {

                throw new Error(
                    "Unable to fetch orders"
                );

            }



            const data = await response.json();



            console.log(
                "ORDER DATA = ",
                data
            );



            setOrders(data);



        } catch(error) {


            console.error(error);


            setError(
                "Unable to load orders"
            );



        } finally {


            setLoading(false);

        }


    };







    useEffect(()=>{


        loadOrders();


    },[]);








    const cancelOrder = async(id)=>{


        if(!window.confirm("Cancel this order?")) {

            return;

        }




        try {


            const response = await fetch(

                `http://localhost:8082/api/admin/orders/${id}/status?status=CANCELLED`,

                {

                    method:"PUT",

                    credentials:"include"

                }

            );




            if(!response.ok) {

                throw new Error(
                    "Cancel failed"
                );

            }



            loadOrders();




        } catch(error) {


            console.error(error);


            setError(
                "Unable to cancel order"
            );


        }


    };







    return (


        <div className="admin-page">



            <h1>
                Orders Management
            </h1>



            <hr />





            {
                error &&


                <div className="alert alert-danger">

                    {error}

                </div>


            }







            <h2>
                All Orders
            </h2>







            <div className="orders-box">






            {
                loading ?


                (

                    <h4>
                        Loading orders...
                    </h4>

                )



                :



                (


                <table className="admin-table">



                    <thead>


                        <tr>


                            <th>
                                Order ID
                            </th>


                            <th>
                                Customer
                            </th>


                            <th>
                                Amount
                            </th>


                            <th>
                                Payment
                            </th>


                            <th>
                                Status
                            </th>


                            <th>
                                Order Date
                            </th>


                            <th>
                                Action
                            </th>


                        </tr>


                    </thead>







                    <tbody>






                    {
                        orders.length === 0 &&


                        <tr>

                            <td colSpan="7">

                                No Orders Found

                            </td>


                        </tr>


                    }







                    {
                        orders.map(order => (



                            <tr key={order.orderId}>


                                <td>
                                    {order.orderId}
                                </td>





                                <td>
                                    {order.customerName}
                                </td>





                                <td>
                                    ₹{order.totalAmount}
                                </td>





                                <td>
                                    {order.paymentStatus}
                                </td>





                                <td>


                                    <span

                                    className={
                                        order.orderStatus === "COMPLETED"

                                        ?

                                        "status completed"

                                        :

                                        order.orderStatus === "CANCELLED"

                                        ?

                                        "status cancelled"

                                        :

                                        "status pending"
                                    }

                                    >

                                        {order.orderStatus}

                                    </span>


                                </td>








                                <td>

                                    {
                                        order.createdAt
                                        ?
                                        order.createdAt.replace("T"," ")
                                        :
                                        "-"
                                    }

                                </td>







                                <td>



                                    {
                                        order.orderStatus !== "CANCELLED"

                                        &&


                                        <button

                                        className="delete-btn"

                                        onClick={() =>
                                            cancelOrder(
                                                order.orderId
                                            )
                                        }

                                        >

                                            Cancel

                                        </button>

                                    }



                                </td>





                            </tr>



                        ))
                    }





                    </tbody>




                </table>


                )

            }





            </div>





        </div>


    );


}


export default AdminOrders;