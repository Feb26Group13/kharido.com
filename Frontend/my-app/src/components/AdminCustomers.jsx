import { useEffect, useState } from "react";

function AdminCustomers() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const loadCustomers = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:8082/api/admin/users/customers",
                {
                    credentials: "include"
                }
            );


            if (!response.ok) {
                throw new Error("Unable to fetch customers");
            }


            const data = await response.json();

            console.log("CUSTOMER DATA =", data);

            setCustomers(data);


        } catch (error) {

            console.error(error);

            setError("Unable to load customers");


        } finally {

            setLoading(false);

        }

    };



    useEffect(() => {

        loadCustomers();

    }, []);




    const updateCustomerStatus = async (id, status) => {


        const message =
            status === "BLOCKED"
                ? "Block this customer?"
                : "Activate this customer?";


        if (!window.confirm(message)) {
            return;
        }



        try {


            const response = await fetch(

                `http://localhost:8082/api/admin/users/${id}/status?status=${status}`,

                {
                    method: "PUT",
                    credentials: "include"
                }

            );



            if (!response.ok) {

                throw new Error(
                    "Status update failed"
                );

            }



            loadCustomers();



        } catch(error) {


            console.error(error);

            setError(
                "Unable to update customer status"
            );


        }

    };





    return (

        <div className="admin-page">


            <h1>
                Customer Management
            </h1>


            <hr />



            {
                error &&

                <div className="alert alert-danger">

                    {error}

                </div>

            }




            <div className="customer-box">


                <h2>
                    Customers List
                </h2>




                {
                    loading ?


                    (

                        <h4>
                            Loading customers...
                        </h4>

                    )


                    :


                    (


                    <table className="admin-table">


                        <thead>


                            <tr>

                                <th>ID</th>

                                <th>Name</th>

                                <th>Email</th>

                                <th>Role</th>

                                <th>Status</th>

                                <th>Created At</th>

                                <th>Action</th>


                            </tr>


                        </thead>





                        <tbody>



                        {
                            customers.length === 0 ?


                            (

                                <tr>

                                    <td 
                                    colSpan="7"
                                    className="text-center">

                                        No Customers Found

                                    </td>


                                </tr>

                            )


                            :



                            customers.map(customer => (



                                <tr key={customer.userId}>


                                    <td>
                                        {customer.userId}
                                    </td>



                                    <td>
                                        {customer.username}
                                    </td>



                                    <td>
                                        {customer.email}
                                    </td>



                                    <td>
                                        {customer.role}
                                    </td>




                                    <td>


                                        <span
                                        className={
                                            customer.status === "ACTIVE"
                                            ?
                                            "status completed"
                                            :
                                            "status pending"
                                        }>

                                            {customer.status}

                                        </span>


                                    </td>





                                    <td>

                                        {
                                            customer.createdAt
                                            ?
                                            customer.createdAt.replace("T"," ")
                                            :
                                            "-"
                                        }

                                    </td>





                                    <td>


                                    {
                                        customer.status === "ACTIVE"


                                        ?


                                        <button

                                        className="delete-btn"

                                        onClick={() =>
                                            updateCustomerStatus(
                                                customer.userId,
                                                "BLOCKED"
                                            )
                                        }>

                                            Block User

                                        </button>



                                        :



                                        <button

                                        className="view-btn"

                                        onClick={() =>
                                            updateCustomerStatus(
                                                customer.userId,
                                                "ACTIVE"
                                            )
                                        }>

                                            Activate User

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


export default AdminCustomers;