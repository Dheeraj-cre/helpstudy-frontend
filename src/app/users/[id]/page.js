"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";

export default function SingleUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      const data = await res.json();
      setUser(data);
      setLoading(false);
    };

    fetchUser();
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
      <Button variant="outlined" onClick={() => router.push("/users")}>
        ← Back to Users
      </Button>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {user.firstName} {user.lastName}
          </Typography>

          <Stack spacing={1}>
            <Typography>Email: {user.email}</Typography>
            <Typography>Gender: {user.gender}</Typography>
            <Typography>Phone: {user.phone}</Typography>
            <Typography>Age: {user.age}</Typography>
            <Typography>Company: {user.company?.name}</Typography>
            <Typography>Address: {user.address?.address}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
