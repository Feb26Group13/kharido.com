import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PickedOrders() {
    const [orders, setOrders] = useState([]);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        // Fetch all orders for this delivery person
        fetch(`http://localhost:8081/delivery/orders/${user.userid}`)
            .then(resp => resp.json())
            .then(data => {
                // Filter ONLY the orders that have been picked up
                const pickedOrders = data.filter(order => 
                    order.pickupStatus === "PICKED_UP" // Change this string to match your exact DB value
                );
                setOrders(pickedOrders);
            });
    }, [user.userid]);

    return (
        <>
            <h2>Picked Orders</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Assigned Date</th>
                        <th>Pickup Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.assignmentId}>
                            <td>{order.orderId}</td>
                            <td>{order.assignedDate}</td>
                            <td>{order.pickupStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}