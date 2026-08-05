import { Box, Typography } from "@mui/material";
import ProductCard from "../customer/components/product/ProductCard";
import laptop from "../assets/laptop.jpg";
import mobile from "../assets/mobile.jpg";
import headphone from "../assets/headphone.jpg";

function Products() {
  const products = [
    {
      productId: 1,
      productName: "ASUS VivoBook 15 Laptop",
      category: "Electronics",
      brand: "ASUS",
      price: 70000,
      stockQuantity: 10,
      imageUrl: laptop
    },
    {
      productId: 2,
      productName: "iPhone 15 Smartphone",
      category: "Mobiles",
      brand: "Apple",
      price: 60000,
      stockQuantity: 8,
      imageUrl: mobile
    },
    {
      productId: 3,
      productName: "boAt Rockerz 450 Headphones",
      category: "Electronics",
      brand: "boAt",
      price: 2000,
      stockQuantity: 15,
      imageUrl: headphone
    }
  ];

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 4, mb: 4, width: "100%", boxSizing: "border-box" }}>
      <Typography variant="h5" fontWeight={700} sx={{ color: "#111827", mb: 3 }}>
        Featured Products
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          width: "100%"
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </Box>
    </Box>
  );
}

export default Products;