function AdminCustomers(){

return(

<div className="admin-page">


<h1>Customer Management</h1>


<hr/>


<h2>Customers List</h2>



<div className="customer-box">


<table className="admin-table">


<thead>

<tr>

<th>Name</th>

<th>Email</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>



<tbody>


<tr>


<td>
Sailesh
</td>



<td>
sailesh@gmail.com
</td>



<td>

<span className="status completed">
Active
</span>

</td>



<td>


<button className="view-btn">
View Details
</button>



<button className="delete-btn">
Block User
</button>


</td>



</tr>



<tr>


<td>
Rahul
</td>



<td>
rahul@gmail.com
</td>



<td>

<span className="status completed">
Active
</span>

</td>



<td>


<button className="view-btn">
View Details
</button>



<button className="delete-btn">
Block User
</button>


</td>



</tr>




</tbody>


</table>


</div>


</div>

)

}


export default AdminCustomers;