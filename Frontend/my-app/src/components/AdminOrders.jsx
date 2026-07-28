function AdminOrders(){

return(

<div className="admin-page">


<h1>Orders Management</h1>

<hr/>


<h2>View All Orders</h2>


<div className="orders-box">


<table className="admin-table">


<thead>

<tr>

<th>Order ID</th>

<th>Customer</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>



<tbody>


<tr>

<td>101</td>

<td>Rahul</td>


<td>

<span className="status pending">
Pending
</span>

</td>


<td>


<button className="edit-btn">
Update Status
</button>


<button className="delete-btn">
Cancel Order
</button>


</td>


</tr>



<tr>

<td>102</td>

<td>Amit</td>


<td>

<span className="status completed">
Completed
</span>

</td>


<td>


<button className="edit-btn">
Update Status
</button>


<button className="delete-btn">
Cancel Order
</button>


</td>


</tr>



</tbody>


</table>


</div>


</div>

)

}


export default AdminOrders;