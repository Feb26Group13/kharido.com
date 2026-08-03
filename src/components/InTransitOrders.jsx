import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function InTransitOrders() {
    const [orders, setOrders] = useState([]);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        fetch(`http://localhost:8081/delivery/orders/${user.userid}`)
            .then(resp => resp.json())
            .then(data => {
                // Filter ONLY the orders currently in transit
                const transitOrders = data.filter(order => 
                    order.pickupStatus === "IN_TRANSIT" 
                );
                setOrders(transitOrders);
            });
    }, [user.userid]);

    return (
        <>
            <h2>In Transit Orders</h2>
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