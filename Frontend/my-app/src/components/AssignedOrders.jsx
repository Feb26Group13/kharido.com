import { useEffect,useState } from "react";
import { useSelector } from "react-redux";

export default function AssignedOrders(){

    const [orders,setOrders] = useState([]);

    const user = useSelector(
        state => state.auth.user
    );

    useEffect(()=>{

        fetch(
            `http://localhost:3000/delivery/orders/${user.userid}`
        )
        .then(resp=>resp.json())
        .then(data=>{
            setOrders(data);
        });

    },[]);

    return(
        <>
            <h2>Assigned Orders</h2>

            <table border="1">

                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>City</th>
                        <th>Amount</th>
                        <th>Order Status</th>
                        <th>Pickup Status</th>
                    </tr>
                </thead>

                <tbody>

                {
                    orders.map(order=>(
                        <tr key={order.assignmentid}>
                            <td>{order.orderid}</td>
                            <td>{order.city}</td>
                            <td>{order.total_amount}</td>
                            <td>{order.order_status}</td>
                            <td>{order.pickup_status}</td>
                        </tr>
                    ))
                }

                </tbody>

            </table>
        </>
    )
}