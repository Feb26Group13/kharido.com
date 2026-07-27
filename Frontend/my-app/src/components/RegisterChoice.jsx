import { Link } from "react-router-dom";

export default function RegisterChoice() {
    return (
        <>
            <h1>Select Registration Type</h1>

            <Link to="/register/user">
                <button>User Registration</button>
            </Link>

            <br /><br />

            <Link to="/register/seller">
                <button>Seller Registration</button>
            </Link>
        </>
    );
}