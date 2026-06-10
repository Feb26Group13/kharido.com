import { useState } from "react";

export default function CustomerRegisterComp(){

    const [form,setForm] = useState({
        firstname:"",
        lastname:"",
        username:"",
        email:"",
        password:"",
        phone:""
    });

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit = (e)=>{
        e.preventDefault();

        fetch(
            "http://localhost:3000/register/customer",
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
            <h2>Customer Registration</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
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
                    placeholder="Mobile"
                    onChange={handleChange}
                />

                <button type="submit">
                    Register
                </button>

            </form>
        </>
    );
}