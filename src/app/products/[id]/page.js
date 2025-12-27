"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Grid,
  Box,
} from "@mui/material";

export default function SingleProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Button variant="outlined" onClick={() => router.push("/products")}>
        ← Back to Products
      </Button>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Images */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={product.thumbnail}
              alt={product.title}
            />
          </Card>

          {/* Extra images */}
          <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
            {product.images?.slice(0, 4).map((img, index) => (
              <img
                key={index}
                src={img}
                alt="product"
                style={{
                  width: 70,
                  height: 70,
                  objectFit: "cover",
                  borderRadius: 4,
                }}
              />
            ))}
          </Box>
        </Grid>

        {/* Details */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {product.title}
              </Typography>

              <Typography variant="body1" gutterBottom>
                {product.description}
              </Typography>

              <Typography>Category: {product.category}</Typography>
              <Typography>Brand: {product.brand}</Typography>
              <Typography>Price: ${product.price}</Typography>
              <Typography>Rating: ⭐ {product.rating}</Typography>
              <Typography>Stock: {product.stock}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
