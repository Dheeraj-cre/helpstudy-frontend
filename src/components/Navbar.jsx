"use client";

import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => router.push("/dashboard")}
        >
          HelpStudyAbroad
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button color="inherit" onClick={() => router.push("/users")}>
            Users
          </Button>
          <Button color="inherit" onClick={() => router.push("/products")}>
            Products
          </Button>
          <Button color="inherit" onClick={() => signOut({ callbackUrl: "/login" })}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
