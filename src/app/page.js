"use client";

import { Button, Typography, Container } from "@mui/material";

export default function Home() {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        HelpStudyAbroad Frontend Test
      </Typography>

      <Button variant="contained" color="primary">
        MUI Working ✅
      </Button>
    </Container>
  );
}
