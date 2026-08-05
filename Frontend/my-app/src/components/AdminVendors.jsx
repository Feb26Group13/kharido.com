import { useEffect, useState } from "react";

function AdminVendors() {

    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");



    const loadVendors = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:8082/api/admin/sellers",
                {
                    credentials: "include"
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Unable to fetch vendors"
                );

            }


            const data = await response.json();


            console.log(
                "VENDOR DATA =",
                data
            );


            setVendors(data);


        } catch (error) {


            console.error(error);

            setError(
                "Unable to load vendors"
            );


        } finally {

            setLoading(false);

        }

    };




    useEffect(() => {

        loadVendors();

    }, []);







    const approveVendor = async (id) => {

        try {


            const response = await fetch(

                `http://localhost:8082/api/admin/sellers/${id}/approve`,

                {
                    method: "PUT",
                    credentials: "include"
                }

            );



            if (!response.ok) {

                throw new Error(
                    "Approve failed"
                );

            }


            loadVendors();



        } catch (error) {


            console.error(error);

            setError(
                "Unable to approve vendor"
            );


        }

    };









    const rejectVendor = async (id) => {

        try {


            const response = await fetch(

                `http://localhost:8082/api/admin/sellers/${id}/reject`,

                {
                    method: "PUT",
                    credentials: "include"
                }

            );



            if (!response.ok) {

                throw new Error(
                    "Reject failed"
                );

            }


            loadVendors();



        } catch (error) {


            console.error(error);

            setError(
                "Unable to reject vendor"
            );


        }

    };









    const blockVendor = async (id) => {

        try {


            const response = await fetch(

                `http://localhost:8082/api/admin/sellers/${id}/block`,

                {
                    method: "PUT",
                    credentials: "include"
                }

            );



            if (!response.ok) {

                throw new Error(
                    "Block failed"
                );

            }


            loadVendors();



        } catch (error) {


            console.error(error);

            setError(
                "Unable to block vendor"
            );


        }

    };









    const activateVendor = async (id) => {

        try {


            const response = await fetch(

                `http://localhost:8082/api/admin/sellers/${id}/activate`,

                {
                    method: "PUT",
                    credentials: "include"
                }

            );



            if (!response.ok) {

                throw new Error(
                    "Activate failed"
                );

            }


            loadVendors();



        } catch (error) {


            console.error(error);

            setError(
                "Unable to activate vendor"
            );


        }

    };








    return (

        <div className="admin-page">


            <h1>
                Vendor Management
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
                    Vendor List
                </h2>





                {
                    loading ?


                    <h4>
                        Loading vendors...
                    </h4>


                    :



                    <table className="admin-table">


                        <thead>


                            <tr>

                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Shop</th>
                                <th>GST</th>
                                <th>Phone</th>
                                <th>Approval</th>
                                <th>Approved Date</th>
                                <th>Action</th>

                            </tr>


                        </thead>





                        <tbody>


                        {
                            vendors.length === 0 ?


                            <tr>

                                <td colSpan="9">

                                    No Vendors Found

                                </td>

                            </tr>


                            :



                            vendors.map(vendor => (


                                <tr key={vendor.sellerId}>


                                    <td>
                                        {vendor.sellerId}
                                    </td>


                                    <td>
                                        {vendor.username}
                                    </td>


                                    <td>
                                        {vendor.email}
                                    </td>


                                    <td>
                                        {vendor.shopName}
                                    </td>


                                    <td>
                                        {vendor.gstNumber}
                                    </td>


                                    <td>
                                        {vendor.phone}
                                    </td>



                                    <td>


                                        <span
                                        className={
                                            vendor.approvalStatus === "APPROVED"

                                            ?

                                            "status completed"

                                            :

                                            vendor.approvalStatus === "BLOCKED"

                                            ?

                                            "status rejected"

                                            :

                                            "status pending"
                                        }
                                        >

                                            {vendor.approvalStatus}

                                        </span>


                                    </td>




                                    <td>

                                        {
                                            vendor.approvedDate

                                            ?

                                            vendor.approvedDate.replace("T"," ")

                                            :

                                            "-"
                                        }

                                    </td>






                                    <td>


                                        <button
                                        className="btn btn-success btn-sm me-2"

                                        disabled={
                                            vendor.approvalStatus === "APPROVED"
                                        }

                                        onClick={() =>
                                            approveVendor(
                                                vendor.sellerId
                                            )
                                        }
                                        >

                                            Approve

                                        </button>






                                        <button
                                        className="btn btn-warning btn-sm me-2"

                                        onClick={() =>
                                            rejectVendor(
                                                vendor.sellerId
                                            )
                                        }
                                        >

                                            Reject

                                        </button>







                                        {
                                            vendor.approvalStatus === "BLOCKED"

                                            ?


                                            <button
                                            className="btn btn-primary btn-sm"

                                            onClick={() =>
                                                activateVendor(
                                                    vendor.sellerId
                                                )
                                            }
                                            >

                                                Activate

                                            </button>


                                            :


                                            <button
                                            className="btn btn-danger btn-sm"

                                            onClick={() =>
                                                blockVendor(
                                                    vendor.sellerId
                                                )
                                            }
                                            >

                                                Block

                                            </button>

                                        }



                                    </td>


                                </tr>


                            ))

                        }


                        </tbody>


                    </table>


                }



            </div>



        </div>

    );

}


export default AdminVendors;