import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LogoutComp(){
    //dispatch action to redux
    //navigate to/
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(logout())
        navigate("/")
    },[]);

    
}