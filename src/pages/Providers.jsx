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
  Modal,
  Box,
  Button,
  Typography, // Added for better text styling
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

function Providers() {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [error, setError] = useState(null); // State for error messages
  const [noProviders, setNoProviders] = useState(false); // State to check if no providers are found

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      setNoProviders(false); // Reset noProviders state before fetching
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/getAllProvidersForDashboard`,
        );

        if (!response.ok) {
          // Handle HTTP errors
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Ensure data.providers is an array
        if (Array.isArray(data)) {
          if (data.length === 0) {
            setNoProviders(true);
          } else {
            // Sort providers by 'createdAt' in descending order
            const sortedProviders = data.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            );
            setUserData(sortedProviders);
          }
        } else {
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch providers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = userData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/provider/${id}`,
          {
            method: "DELETE",
          },
        );
        if (response.ok) {
          setUserData(userData.filter((user) => user.id !== id));
          console.log("User deleted successfully");
        } else {
          console.error("Failed to delete user");
          alert("Failed to delete user. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user.");
      }
    }
  };

  const handleViewMore = (provider) => {
    setSelectedProvider(provider);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProvider(null);
  };

  return (
    <div className="overflow-auto">
      <Layout>
        <div className="px-4 pt-12">
          <h1 className="font-bold text-3xl">Providers</h1>
        </div>
        <div>
          <div className="p-5 pt-16">
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "60vh",
                }}
              >
                <CircularProgress />
              </div>
            ) : error ? (
              <Typography
                variant="h6"
                color="error"
                align="center"
                sx={{ mt: 4 }}
              >
                {error}
              </Typography>
            ) : noProviders ? (
              <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                No provider found.
              </Typography>
            ) : (
              <>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                        >
                          First Name
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                        >
                          Last Name
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: "1rem", fontWeight: "bold" }}
                        >
                          Email
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: "1rem", fontWeight: "bold" }}
                        >
                          Biography
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: "1rem", fontWeight: "bold" }}
                        >
                          Available
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: "1rem", fontWeight: "bold" }}
                        >
                          Insurance
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: "1rem", fontWeight: "bold" }}
                        >
                          Professional Title
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: "1rem", fontWeight: "bold" }}
                        >
                          Delete
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: "1rem", fontWeight: "bold" }}
                        >
                          View More
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedData.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={9} // Adjusted to match the number of columns
                            style={{
                              textAlign: "center",
                              color: "#00303A",
                              padding: "20px",
                            }}
                          >
                            No providers available.
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell sx={{ fontSize: "1.1rem" }}>
                              {row?.firstName}
                            </TableCell>
                            <TableCell sx={{ fontSize: "1.1rem" }}>
                              {row?.lastName}
                            </TableCell>
                            <TableCell sx={{ fontSize: "1.1rem" }}>
                              {row?.email}
                            </TableCell>
                            <TableCell sx={{ fontSize: "1.1rem" }}>
                              {row?.biography
                                ? row.biography.substring(0, 30) + "..."
                                : "N/A"}
                            </TableCell>
                            <TableCell sx={{ fontSize: "1.1rem" }}>
                              {row?.currentlyAcceptingNewClients ? "Yes" : "No"}
                            </TableCell>
                            <TableCell sx={{ fontSize: "1.1rem" }}>
                              {row?.insuranceAccepted &&
                              row.insuranceAccepted.length > 0
                                ? "Yes"
                                : "No"}
                            </TableCell>
                            <TableCell sx={{ fontSize: "1.1rem" }}>
                              {row?.professionalTitle &&
                              row.professionalTitle.length > 0
                                ? row.professionalTitle[0]
                                : "N/A"}
                            </TableCell>
                            <TableCell>
                              <IconButton
                                onClick={() => handleDeleteUser(row.id)}
                                aria-label="delete"
                              >
                                <MdDelete sx={{ color: "#FF0000" }} />
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              <a
                                href={`${import.meta.env.VITE_FRONTEND_URL}/provider/${row.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button
                                  variant="outlined"
                                  sx={{
                                    mt: 2,
                                    border: "2px solid #00303A",
                                    color: "#00303A",
                                    ":hover": {
                                      border: "2px solid #00303A",
                                      color: "#00303A",
                                    },
                                  }}
                                >
                                  View More
                                </Button>
                              </a>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                {userData.length > 0 && (
                  <div className="flex justify-center mt-4">
                    <Pagination
                      count={Math.ceil(userData.length / rowsPerPage)}
                      page={page}
                      onChange={handleChangePage}
                      shape="rounded"
                      size="large"
                      sx={{
                        "& .MuiPaginationItem-root": {
                          bgcolor: "#00303A",
                          color: "white",
                        },
                        "& .MuiPaginationItem-root:hover": {
                          bgcolor: "#005052",
                        },
                        "& .Mui-selected": {
                          color: "#00303A",
                        },
                      }}
                    />
                  </div>
                )}
              </>
            )}

            {/* Modal for viewing more information */}
            <Modal open={openModal} onClose={handleCloseModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
                  width: { xs: "80%", sm: "60%", md: "40%" }, // Responsive width
                }}
              >
                {selectedProvider && (
                  <div className="space-y-3">
                    <Typography variant="h5" gutterBottom>
                      {selectedProvider.firstName} {selectedProvider.lastName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Email:</strong> {selectedProvider.email}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Biography:</strong>{" "}
                      {selectedProvider.biography || "N/A"}
                    </Typography>
                    {/* You can display more fields here as needed */}
                    <Typography variant="body1">
                      <strong>Website:</strong>{" "}
                      {selectedProvider.websiteURL ? (
                        <a
                          href={selectedProvider.websiteURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {selectedProvider.websiteURL}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Years of Experience:</strong>{" "}
                      {selectedProvider.yearsOfExperience
                        ? selectedProvider.yearsOfExperience.label
                        : "N/A"}
                    </Typography>
                    {/* Add other fields as necessary */}
                  </div>
                )}
                <Button
                  onClick={handleCloseModal}
                  variant="contained"
                  sx={{ mt: 2, backgroundColor: "#00303A" }}
                >
                  Close
                </Button>
              </Box>
            </Modal>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Providers;
