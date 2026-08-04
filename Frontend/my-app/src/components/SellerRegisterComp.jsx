// // import { useState } from "react";

// // export default function SellerRegisterComp(){

// //     const [form,setForm] = useState({
// //         shop_name:"",
// //         gst_number:"",
// //         username:"",
// //         email:"",
// //         password:"",
// //         phone:""
// //     });

// //     const handleChange=(e)=>{
// //         setForm({
// //             ...form,
// //             [e.target.name]:e.target.value
// //         });
// //     };

// //     const handleSubmit=(e)=>{
// //         e.preventDefault();

// //         fetch(
// //             "http://localhost:8081/seller/register",
// //             {
// //                 method:"POST",
// //                 headers:{
// //                     "Content-Type":"application/json"
// //                 },
// //                 body:JSON.stringify(form)
// //             }
// //         )
// //         .then(resp=>resp.json())
// //         .then(data=>{
// //             alert(data.message);
// //         });
// //     };

// //     return(
// //         <>
// //             <h2>Seller Registration</h2>

// //            <form onSubmit={handleSubmit} className="seller-form">

// //     <input type="text" name="shop_name" placeholder="Shop Name" onChange={handleChange} />

// //     <input type="text" name="gst_number" placeholder="GST Number" onChange={handleChange} />

// //     <input type="text" name="username" placeholder="Username" onChange={handleChange} />

// //     <input type="email" name="email" placeholder="Email" onChange={handleChange} />

// //     <input type="password" name="password" placeholder="Password" onChange={handleChange} />

// //     <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />

// //     <button type="submit">Register Seller</button>

// // </form>

// //         </>
// //     );
// // }
// import { useState } from "react";

// export default function SellerRegisterComp() {

//     const [form, setForm] = useState({
//         shopName: "",
//         gstNumber: "",
//         username: "",
//         email: "",
//         password: "",
//         phone: ""
//     });

//     const handleChange = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         console.log(form); // Check what is being sent

//         fetch("http://localhost:8081/seller/register", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(form)
//         })
//         .then(resp => resp.json())
//         .then(data => {
//             alert(data.message);
//         })
//         .catch(err => {
//             console.error(err);
//         });
//     };

//     return (
//         <>
//             <h2>Seller Registration</h2>

//             <form onSubmit={handleSubmit} className="seller-form">

//                 <input
//                     type="text"
//                     name="shopName"
//                     placeholder="Shop Name"
//                     value={form.shopName}
//                     onChange={handleChange}
//                     required
//                 />

//                 <input
//                     type="text"
//                     name="gstNumber"
//                     placeholder="GST Number"
//                     value={form.gstNumber}
//                     onChange={handleChange}
//                     required
//                 />

//                 <input
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                     value={form.username}
//                     onChange={handleChange}
//                     required
//                 />

//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={form.email}
//                     onChange={handleChange}
//                     required
//                 />

//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={form.password}
//                     onChange={handleChange}
//                     required
//                 />

//                 <input
//                     type="text"
//                     name="phone"
//                     placeholder="Phone"
//                     value={form.phone}
//                     onChange={handleChange}
//                     required
//                 />

//                 <button type="submit">
//                     Register Seller
//                 </button>

//             </form>
//         </>
//     );
// }

import { useState } from "react";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import StoreIcon from "@mui/icons-material/Store";

export default function SellerRegisterComp() {

  const [form, setForm] = useState({
    shopName: "",
    gstNumber: "",
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8081/seller/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setMsg(data.message);

        if (data.message.toLowerCase().includes("success")) {
          setError(false);

          setForm({
            shopName: "",
            gstNumber: "",
            username: "",
            email: "",
            password: "",
            phone: "",
          });
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
        setMsg("Unable to connect to Spring Boot Backend.");
      });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          p: 5,
          borderRadius: 4,
        }}
      >
        <Box textAlign="center" mb={3}>
          <Avatar
            sx={{
              bgcolor: "success.main",
              width: 60,
              height: 60,
              mx: "auto",
              mb: 2,
            }}
          >
            <StoreIcon />
          </Avatar>

          <Typography variant="h4" fontWeight="bold">
            Seller Registration
          </Typography>

          <Typography color="text.secondary" mt={1}>
            Start selling on Kharido
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>

          <TextField
            fullWidth
            margin="normal"
            label="Shop Name"
            name="shopName"
            value={form.shopName}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="GST Number"
            name="gstNumber"
            value={form.gstNumber}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            size="large"
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 2,
            }}
          >
            Register Seller
          </Button>

          {msg && (
            <Alert
              severity={error ? "error" : "success"}
              sx={{ mt: 3 }}
            >
              {msg}
            </Alert>
          )}

        </Box>
      </Paper>
    </Container>
  );
}