// import { Link } from "react-router-dom";

// export default function RegisterChoice() {
//     return (
//        <div className="register-choice">
//             <h1>Select Registration Type</h1>

//             <Link to="/register/user">
//                 <button>User Registration</button>
//             </Link>

//             <br /><br />

//             <Link to="/register/seller">
//                 <button>Seller Registration</button>
//             </Link>

//             <br /><br />

//             <Link to="/register/admin">
//                 <button>Admin Registration</button>
//             </Link>
//        </div>
//     );
// }

import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function RegisterChoice() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          elevation={8}
          sx={{
            width: "100%",
            p: 4,
            borderRadius: 4,
          }}
        >
          <CardContent>

            <Typography
              variant="h3"
              align="center"
              fontWeight="bold"
              gutterBottom
            >
              Join Kharido.Com
            </Typography>

            <Typography
              align="center"
              color="text.secondary"
              mb={5}
            >
              Choose how you want to register
            </Typography>

            <Grid container spacing={4}>

              {/* Customer */}

              <Grid item xs={12} md={4}>
                <Card
                  elevation={3}
                  sx={{
                    textAlign: "center",
                    p: 3,
                    borderRadius: 3,
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 10,
                    },
                  }}
                >
                  <PersonIcon
                    color="primary"
                    sx={{ fontSize: 70 }}
                  />

                  <Typography
                    variant="h5"
                    mt={2}
                    mb={1}
                  >
                    Customer
                  </Typography>

                  <Typography
                    color="text.secondary"
                    mb={3}
                  >
                    Buy products from Kharido.
                  </Typography>

                  <Button
                    component={Link}
                    to="/register/user"
                    variant="contained"
                    fullWidth
                  >
                    Register
                  </Button>

                </Card>
              </Grid>

              {/* Seller */}

              <Grid item xs={12} md={4}>
                <Card
                  elevation={3}
                  sx={{
                    textAlign: "center",
                    p: 3,
                    borderRadius: 3,
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 10,
                    },
                  }}
                >
                  <StoreIcon
                    color="success"
                    sx={{ fontSize: 70 }}
                  />

                  <Typography
                    variant="h5"
                    mt={2}
                    mb={1}
                  >
                    Seller
                  </Typography>

                  <Typography
                    color="text.secondary"
                    mb={3}
                  >
                    Sell your products on Kharido.
                  </Typography>

                  <Button
                    component={Link}
                    to="/register/seller"
                    variant="contained"
                    color="success"
                    fullWidth
                  >
                    Register
                  </Button>

                </Card>
              </Grid>

              {/* Admin */}

              <Grid item xs={12} md={4}>
                <Card
                  elevation={3}
                  sx={{
                    textAlign: "center",
                    p: 3,
                    borderRadius: 3,
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 10,
                    },
                  }}
                >
                  <AdminPanelSettingsIcon
                    color="warning"
                    sx={{ fontSize: 70 }}
                  />

                  <Typography
                    variant="h5"
                    mt={2}
                    mb={1}
                  >
                    Admin
                  </Typography>

                  <Typography
                    color="text.secondary"
                    mb={3}
                  >
                    Manage the Kharido platform.
                  </Typography>

                  <Button
                    component={Link}
                    to="/register/admin"
                    variant="contained"
                    color="warning"
                    fullWidth
                  >
                    Register
                  </Button>

                </Card>
              </Grid>

            </Grid>

          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}