function AdminSettings(){

return(

<div className="admin-page">


<h1>Admin Settings</h1>


<hr/>




<div className="settings-container">



{/* Admin Profile */}

<div className="settings-card">


<h2>Admin Profile</h2>


<p>
<strong>Name:</strong> Admin
</p>


<p>
<strong>Email:</strong> admin@kharido.com
</p>


<button className="view-btn">
Edit Profile
</button>


</div>





{/* Password Change */}

<div className="settings-card">


<h2>Password Change</h2>



<input

type="password"

placeholder="Enter New Password"

/>



<br/>


<button className="save-btn">

Change Password

</button>



</div>







{/* Website Settings */}

<div className="settings-card">


<h2>Website Settings</h2>



<p>
Website Name
</p>


<input

type="text"

placeholder="Kharido"

/>



<p>
Payment Settings
</p>


<button className="save-btn">
Configure Payment
</button>



</div>







{/* Security Settings */}

<div className="settings-card">


<h2>Security Settings</h2>



<ul>


<li>
Enable Two Factor Authentication
</li>


<li>
Login Activity Monitoring
</li>


<li>
Admin Access Control
</li>


</ul>



<button className="save-btn">

Save Security Settings

</button>


</div>



</div>



</div>

)

}


export default AdminSettings;