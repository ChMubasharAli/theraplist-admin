import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { MdDelete } from "react-icons/md";

function Clients() {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1); // Initialize to 1 (Material UI Pagination is 1-indexed)
  const [rowsPerPage, setRowsPerPage] = useState(10); // Control rows per page
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user`,
        );
        const data = await response.json();
        console.log(data);

        // Determine if data is an array or if it contains an array of users
        const usersArray = Array.isArray(data) ? data : data.users;

        if (Array.isArray(usersArray)) {
          // Sort users by 'createdAt' in descending order
          const sortedUsers = usersArray.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );
          setUserData(sortedUsers);
        } else {
          console.error("Fetched data is not an array of users");
          setUserData(data); // Optionally set the raw data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, []);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate which rows to display based on pagination
  const paginatedData = userData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  // Delete user function
  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/${id}`,
          {
            method: "DELETE",
          },
        );
        if (response.ok) {
          // Update the user data to remove the deleted user
          setUserData(userData.filter((user) => user.id !== id));
          console.log("User deleted successfully");
        } else {
          console.error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="overflow-auto">
      <Layout>
        <div className="px-4 pt-12">
          <h1 className="font-bold text-3xl">Clients</h1>
        </div>
        <div>
          <div className="p-5 pt-16">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      First Name
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Last Name
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Email
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? ( // Show loader while data is being fetched
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        style={{
                          textAlign: "center",
                          color: "#00303A",
                          height: "80vh",
                        }}
                      >
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell sx={{ fontSize: "1.1rem" }}>
                          {row.firstName}
                        </TableCell>
                        <TableCell sx={{ fontSize: "1.1rem" }}>
                          {row.lastName}
                        </TableCell>
                        <TableCell sx={{ fontSize: "1.1rem" }}>
                          {row.email}
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleDeleteUser(row.id)}>
                            <MdDelete sx={{ color: "#FF0000" }} />{" "}
                            {/* Red color for delete icon */}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Add rounded pagination controls with custom color */}
            <div className="flex justify-center mt-4">
              <Pagination
                count={Math.ceil(userData.length / rowsPerPage)} // Total number of pages
                page={page}
                onChange={handleChangePage}
                shape="rounded" // Use rounded shape for pagination buttons
                size="large" // Optional: Adjust size (default, small, large)
                sx={{
                  "& .MuiPaginationItem-root": {
                    bgcolor: "#00303A", // Background color of the pagination boxes
                    color: "white", // Text color
                  },
                  "& .MuiPaginationItem-root:hover": {
                    bgcolor: "#005052", // Background color on hover
                  },
                  "& .Mui-selected": {
                    color: "#00303A",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Clients;
