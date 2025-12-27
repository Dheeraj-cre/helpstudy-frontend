"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { useState } from "react";
import useAuthStore from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Admin Login
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography variant="caption" display="block" sx={{ mt: 2 }}>
          Demo credentials: <b>kminchelle / 0lelplR</b>
        </Typography>
      </Box>
    </Container>
  );
}
