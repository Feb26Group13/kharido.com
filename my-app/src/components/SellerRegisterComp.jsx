import { useState } from "react";

export default function SellerRegisterComp(){

    const [form,setForm] = useState({
        shop_name:"",
        gst_number:"",
        username:"",
        email:"",
        password:"",
        phone:""
    });

    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit=(e)=>{
        e.preventDefault();

        fetch(
            "http://localhost:3000/register/seller",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(form)
            }
        )
        .then(resp=>resp.json())
        .then(data=>{
            alert(data.message);
        });
    };

    return(
        <>
            <h2>Seller Registration</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="shop_name"
                    placeholder="Shop Name"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="gst_number"
                    placeholder="GST Number"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                />

                <button type="submit">
                    Register Seller
                </button>

            </form>
        </>
    );
}