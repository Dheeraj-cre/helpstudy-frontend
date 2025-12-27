"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Typography, Container } from "@mui/material";
import { useEffect } from "react";


export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status === "loading") return null;

  return (
     <ProtectedRoute>
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Dashboard</Typography>
      <Typography>Welcome! You are logged in.</Typography>
    </Container>
     </ProtectedRoute>
  );
}
