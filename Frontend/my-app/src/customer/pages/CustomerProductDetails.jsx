import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Box,
    Grid,
    Typography,
    Button,
    Chip,
    CircularProgress,
    Alert,
    Paper,
    Snackbar
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { getProductById } from "../services/productService";
import { addToCart } from "../services/cartService";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetails() {

    const { id } = useParams();
    const { refreshCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [cartLoading, setCartLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const prodId = product?.productId || product?.id || product?.productid;
    const isFav = prodId ? isInWishlist(prodId) : false;

    useEffect(() => {
        loadProduct();
    }, [id]);

    async function loadProduct() {
        try {
            setLoading(true);
            setError("");
            const data = await getProductById(id);
            setProduct(data);
        }
        catch (error) {
            console.error(error);
            setError("Unable to load product.");
        }
        finally {
            setLoading(false);
        }
    }

    async function handleAddToCart() {
        if (!prodId) return;

        try {
            setCartLoading(true);
            await addToCart(prodId, 1);
            await refreshCart();
            setSnackbarSeverity("success");
            setSnackbarMessage("Product added to cart successfully.");
            setSnackbarOpen(true);
        }
        catch (err) {
            console.error(err);
            setSnackbarSeverity("error");
            setSnackbarMessage(
                err.response?.data?.message || "Unable to add product to cart."
            );
            setSnackbarOpen(true);
        }
        finally {
            setCartLoading(false);
        }
    }

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                py={8}
            >
                <CircularProgress sx={{ color: "#008C95" }} />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 4,
                    border: "1px solid #ECECEC"
                }}
            >
                <Grid container spacing={5}>
                    <Grid
                        item
                        xs={12}
                        md={5}
                    >
                        <Box
                            component="img"
                            src={
                                product.imageUrl ||
                                "https://placehold.co/700x700?text=No+Image"
                            }
                            alt={product.productName}
                            sx={{
                                width: "100%",
                                borderRadius: 3,
                                border: "1px solid #ECECEC"
                            }}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={7}
                    >

                        <Chip
                            label={product.category}
                            sx={{
                                bgcolor: "#E0F7F8",
                                color: "#008C95",
                                mb: 2
                            }}
                        />

                        <Typography
                            variant="h4"
                            fontWeight="bold"
                        >
                            {product.productName}
                        </Typography>

                        <Typography
                            mt={1}
                            color="text.secondary"
                        >
                            Brand : {product.brand}
                        </Typography>

                        <Typography
                            mt={3}
                            variant="h4"
                            fontWeight="bold"
                            color="#FF7A00"
                        >
                            ₹{product.price}
                        </Typography>

                        <Typography
                            mt={2}
                            color={
                                product.stockQuantity > 0
                                    ? "success.main"
                                    : "error.main"
                            }
                        >
                            {product.stockQuantity > 0
                                ? "In Stock"
                                : "Out of Stock"}
                        </Typography>

                        <Typography
                            mt={4}
                            color="text.secondary"
                        >
                            {product.description}
                        </Typography>

                        <Box
                            mt={5}
                            display="flex"
                            gap={2}
                        >

                            <Button
                                variant="contained"
                                startIcon={<ShoppingCartOutlinedIcon />}
                                disabled={product.stockQuantity === 0 || cartLoading}
                                onClick={handleAddToCart}
                                sx={{
                                    bgcolor: "#008C95",
                                    px: 4,
                                    "&:hover": {
                                        bgcolor: "#00757D"
                                    }
                                }}
                            >
                                {cartLoading ? "Adding..." : "Add To Cart"}
                            </Button>

                            <Button
                                variant={isFav ? "contained" : "outlined"}
                                onClick={() => product && toggleWishlist(product)}
                                startIcon={isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                sx={{
                                    borderColor: isFav ? "#EF4444" : "#008C95",
                                    bgcolor: isFav ? "#EF4444" : "transparent",
                                    color: isFav ? "#FFFFFF" : "#008C95",
                                    px: 3,
                                    "&:hover": {
                                        bgcolor: isFav ? "#DC2626" : "#E0F7F8",
                                        borderColor: isFav ? "#DC2626" : "#00757D"
                                    }
                                }}
                            >
                                {isFav ? "In Wishlist" : "Wishlist"}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    severity={snackbarSeverity}
                    variant="filled"
                    onClose={() => setSnackbarOpen(false)}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}