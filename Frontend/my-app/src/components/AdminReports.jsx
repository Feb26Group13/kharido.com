function AdminReports(){

return(

<div className="admin-page">


<h1>Reports & Analytics</h1>


<hr/>




<div className="report-container">



<div className="report-card">

<h3>Sales Reports</h3>

<h2>₹2,50,000</h2>

<p>
Total Revenue Generated
</p>

</div>





<div className="report-card">

<h3>Order Reports</h3>

<h2>300</h2>

<p>
Completed Orders
</p>

</div>





<div className="report-card">

<h3>Customer Reports</h3>

<h2>120</h2>

<p>
New Customers
</p>

</div>





<div className="report-card">

<h3>Product Performance</h3>


<ul>

<li>
📱 Mobile - Best Selling
</li>


<li>
💻 Laptop - High Revenue
</li>


<li>
🎧 Headphones - Trending
</li>


</ul>


</div>




</div>



<br/>




<div className="activity-box">


<h2>Monthly Summary</h2>



<table className="admin-table">


<thead>

<tr>

<th>Month</th>

<th>Sales</th>

<th>Orders</th>

<th>Customers</th>

</tr>


</thead>



<tbody>


<tr>

<td>January</td>

<td>₹80,000</td>

<td>100</td>

<td>40</td>

</tr>



<tr>

<td>February</td>

<td>₹90,000</td>

<td>120</td>

<td>50</td>

</tr>



<tr>

<td>March</td>

<td>₹80,000</td>

<td>80</td>

<td>30</td>

</tr>



</tbody>


</table>



</div>



</div>

)

}


export default AdminReports;