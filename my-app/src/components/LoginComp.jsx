import { useState } from "react"
import { useDispatch } from "react-redux";
import { login,logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
export default function LoginComp(){
    const[username,setusername]=useState("");
    const[password,setpassword]=useState("");
    const[msg,setmsg]=useState("")
    const navigate = useNavigate();
    const dispatch=useDispatch();
    
    
    const handleSubmit=(e)=>{
        e.preventDefault();

        const reqoptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username:username,
                password:password,
            })
        };

        fetch("http://localhost:3000/login",reqoptions).then(
        resp=>{
            if(resp.status===200){
                return resp.json()
            }
            else if(resp.status===404){
                setmsg("Wrong Id or Password")
                return {}
            }
        }
    )
    .then(data => {
    console.log(JSON.stringify(data));
    if(!data.user){
        return;
    }

    dispatch(
        login({
            user: data.user,
            token: data.token,
        })
    );

    if (data.user.role === 1) {
        navigate("/admin");
    }
    else if (data.user.role === 2) {
        navigate("/seller");
    }
    else {
        navigate("/user");
    }
})

    }
    
    return(
        <>
        <h1>login Form</h1>
        <form>
            Enter Username:
            <input type="text" name="username" value={username} onChange={(e)=>{setusername(e.target.value)}}/><br/>
            Enter Password:
            <input type="password" name="password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/><br/>
            <input type="submit" value="LOGIN" onClick={handleSubmit}/>
        </form>
        <p>{msg}</p>
        </>
    )
}