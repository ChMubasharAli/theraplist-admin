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
} from "@mui/material";
import { MdDelete, MdReply } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Messages() {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/messages`,
        );
        const data = await response.json();
        const messagesArray = Array.isArray(data) ? data : data.messages;
        if (Array.isArray(messagesArray)) {
          const sortedMessages = messagesArray.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );
          setUserData(sortedMessages);
        } else {
          console.error("Fetched data is not an array of messages");
          setUserData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load messages. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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

  const handleDeleteMessage = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?",
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/${id}`,
          {
            method: "DELETE",
          },
        );
        if (response.ok) {
          setUserData(userData.filter((msg) => msg.id !== id));
          toast.success("Message deleted successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error("Failed to delete message. Please try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        console.error("Error deleting message:", error);
        toast.error("Something went wrong. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  const handleReply = (email) => {
    window.location.href = `mailto:${email}?subject=Re: Your message to Your Therap List`;
  };

  const handleViewMore = (message) => {
    setSelectedMessage(message);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMessage(null);
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="overflow-auto">
        <div className="px-4 pt-12">
          <h1 className="font-bold text-4xl">Messages</h1>
        </div>
        <div>
          <div className="p-5 pt-16">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Name
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Email
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Message Preview
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Landing Page
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Reply
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      View More
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
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
                          {row.name}
                        </TableCell>
                        <TableCell sx={{ fontSize: "1.1rem" }}>
                          {row.email}
                        </TableCell>
                        <TableCell sx={{ fontSize: "1.1rem" }}>
                          {row.message.substring(0, 14)}...
                        </TableCell>
                        <TableCell sx={{ fontSize: "1.1rem" }}>
                          {row.isProvider ? "Yes" : "No"}
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleReply(row.email)}>
                            <MdReply style={{ color: "#00303A" }} />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => handleViewMore(row)}
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
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleDeleteMessage(row.id)}
                          >
                            <MdDelete style={{ color: "#FF0000" }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

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
          </div>

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
                width: "40%",
              }}
            >
              {selectedMessage && (
                <div className="space-y-3">
                  <h2 className="text-[2rem]">{selectedMessage.name}</h2>
                  <p className="text-[1.1rem]">
                    <strong>Email:</strong> {selectedMessage.email}
                  </p>
                  <p className="text-[1.1rem]">
                    <strong>Message:</strong> {selectedMessage.message}
                  </p>
                  <p className="text-[1.1rem]">
                    <strong>Date and Time:</strong>{" "}
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleCloseModal();
                      handleReply(selectedMessage.email);
                    }}
                    sx={{ mt: 2, mr: 2, backgroundColor: "#00303A" }}
                  >
                    Reply to this message
                  </Button>
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
  );
}

export default Messages;
