"use client";

import { useEffect, useCallback } from "react";
import {
  Container,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  TablePagination,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function UsersPage() {
  const router = useRouter();

  const {
    users,
    total,
    loading,
    page,
    limit,
    search,
    fetchUsers,
    setSearch,
    setPage,
  } = useUserStore();

  // Fetch users when page or search changes
  useEffect(() => {
    fetchUsers();
  }, [page, search, fetchUsers]);

  // Pagination handler (performance optimized)
  const handlePageChange = useCallback(
    (_, newPage) => {
      setPage(newPage);
    },
    [setPage]
  );

  return (
    <ProtectedRoute>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Users
        </Typography>

        {/* Search */}
        <TextField
          fullWidth
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Paper>
          {loading ? (
            <CircularProgress sx={{ m: 3 }} />
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Company</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.id}
                      hover
                      sx={{ cursor: "pointer" }}
                      onClick={() => router.push(`/users/${user.id}`)}
                    >
                      <TableCell>
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.gender}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.company?.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <TablePagination
                component="div"
                count={total}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={limit}
                rowsPerPageOptions={[limit]}
              />
            </>
          )}
        </Paper>
      </Container>
    </ProtectedRoute>
  );
}
