"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  Pagination,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import useProductStore from "@/store/productStore";

export default function ProductsPage() {
  const router = useRouter();
  const {
    products,
    total,
    loading,
    page,
    limit,
    search,
    category,
    fetchProducts,
    setSearch,
    setCategory,
    setPage,
  } = useProductStore();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [page, search, category]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const totalPages = Math.ceil(total / limit);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          label="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={category}
          displayEmpty
          onChange={(e) => setCategory(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Products Grid */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{ cursor: "pointer", height: "100%" }}
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={product.thumbnail}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom noWrap>
                    {product.title}
                  </Typography>
                  <Typography variant="body2">
                    Category: {product.category}
                  </Typography>
                  <Typography variant="body2">
                    Price: ${product.price}
                  </Typography>
                  <Typography variant="body2">
                    Rating: ⭐ {product.rating}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={(_, value) => setPage(value - 1)}
          />
        </Box>
      )}
    </Container>
  );
}
