function AdminProducts(){

return(

<div className="admin-page">


<h1>Product Management</h1>


<hr/>




<div className="product-admin-box">


<h2>Product Actions</h2>


<div className="product-actions">


<button className="add-btn">
+ Add Product
</button>



<button className="edit-btn">
Edit Product
</button>



<button className="delete-btn">
Delete Product
</button>


</div>


</div>





<br/>




<div className="product-admin-box">


<h2>Manage Categories</h2>



<div className="category-container">


<div className="category-card">

<h3>Electronics</h3>

<p>Laptops, Mobiles, Accessories</p>

</div>



<div className="category-card">

<h3>Fashion</h3>

<p>Clothes, Shoes, Bags</p>

</div>



<div className="category-card">

<h3>Home Appliances</h3>

<p>Furniture, Kitchen Items</p>

</div>



<div className="category-card">

<h3>Groceries</h3>

<p>Daily Essentials</p>

</div>


</div>


</div>





<br/>




<div className="product-admin-box">


<h2>Inventory / Stock</h2>



<table className="admin-table">


<thead>


<tr>

<th>Product</th>

<th>Stock Quantity</th>

<th>Status</th>

</tr>


</thead>




<tbody>


<tr>

<td>
Laptop
</td>


<td>
50
</td>


<td>

<span className="status completed">
Available
</span>

</td>


</tr>





<tr>


<td>
Mobile
</td>


<td>
100
</td>


<td>

<span className="status completed">
Available
</span>

</td>


</tr>




<tr>


<td>
Headphones
</td>


<td>
5
</td>


<td>

<span className="status pending">
Low Stock
</span>

</td>


</tr>



</tbody>


</table>



</div>



</div>

)

}


export default AdminProducts;