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
import { MdDelete } from "react-icons/md";

function Posts() {
  const [postsData, setPostsData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/getAllPosts?page=${page}&limit=${rowsPerPage}`,
        );
        const data = await response.json();
        if (data && data.posts) {
          setPostsData(data.posts);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeletePost = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/deletePost/${id}`,
          {
            method: "DELETE",
          },
        );
        if (response.ok) {
          setPostsData(postsData.filter((post) => post.id !== id));
        } else {
          console.error("Failed to delete post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleViewMore = (post) => {
    setSelectedPost(post);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPost(null);
  };

  return (
    <div className="overflow-auto">
      <Layout>
        <div className="px-4 pt-12">
          <h1 className="font-bold text-4xl">Posts</h1>
        </div>
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
                    Requirements
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Ideal Provider
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Created At
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Delete
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    View More
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
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
                  postsData.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell sx={{ fontSize: "1.1rem" }}>
                        {post.firstName}
                      </TableCell>
                      <TableCell sx={{ fontSize: "1.1rem" }}>
                        {post.lastName}
                      </TableCell>
                      <TableCell sx={{ fontSize: "1.1rem" }}>
                        {post.email}
                      </TableCell>
                      <TableCell sx={{ fontSize: "1.1rem" }}>
                        {post.biography && post.biography.length > 20
                          ? post.biography.substring(0, 20) + "..."
                          : post.biography}
                      </TableCell>
                      <TableCell sx={{ fontSize: "1.1rem" }}>
                        {post.idealProvider && post.idealProvider.length > 20
                          ? post.idealProvider.substring(0, 20) + "..."
                          : post.idealProvider || "N/A"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "1.1rem" }}>
                        {new Date(post.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDeletePost(post.id)}>
                          <MdDelete sx={{ color: "#FF0000" }} />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => handleViewMore(post)}
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
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex justify-center mt-4">
            <Pagination
              count={totalPages}
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
            {selectedPost && (
              <div className="space-y-3 max-h-[80vh] overflow-auto">
                <h2 className="text-[2rem]">
                  {selectedPost.firstName} {selectedPost.lastName}
                </h2>
                <p className="text-[1.1rem]">
                  <strong>Email:</strong> {selectedPost.email}
                </p>
                <p className="text-[1.1rem]">
                  <strong>Biography:</strong> {selectedPost.biography}
                </p>
                <p className="text-[1.1rem]">
                  <strong>Ideal Provider:</strong>{" "}
                  {selectedPost.idealProvider || "Not specified"}
                </p>
                <p className="text-[1.1rem]">
                  <strong>User ID:</strong> {selectedPost.userId}
                </p>
                <p className="text-[1.1rem]">
                  <strong>Licensed States:</strong>{" "}
                  {selectedPost.licensedStates.join(", ")}
                </p>
                <p className="text-[1.1rem]">
                  <strong>Practice Type:</strong> {selectedPost.practiceType}
                </p>
                <p className="text-[1.1rem]">
                  <strong>Areas Of Specialty:</strong>{" "}
                  {selectedPost.areasOfSpecialty.join(", ")}
                </p>
                <p className="text-[1.1rem]">
                  <strong>Professional Title:</strong>{" "}
                  {selectedPost.professionalTitle?.join(", ")}
                </p>
                <p className="text-[1.1rem]">
                  <strong>Therapy Modalities:</strong>{" "}
                  {selectedPost.therapyModalities.join(", ")}
                </p>
                <p className="text-[1.1rem]">
                  <strong>Insurance Accepted:</strong>{" "}
                  {selectedPost.insuranceAccepted.join(", ")}
                </p>
                <p className="text-[1.1rem]">
                  <strong>Zip Code:</strong> {selectedPost.zipCode}
                </p>
                <p className="text-[1.1rem]">
                  <strong>Gender:</strong> {selectedPost.gender}
                </p>
                <p className="text-[1.1rem]">
                  <strong>Years Of Experience:</strong>{" "}
                  {selectedPost.yearsOfExperience}
                </p>
                <p className="text-[1.1rem]">
                  <strong>Currently Accepting New Clients:</strong>{" "}
                  {selectedPost.currentlyAcceptingNewClients}
                </p>
                <p className="text-[1.1rem]">
                  <strong>Special Availability:</strong>{" "}
                  {selectedPost.specialAvailability.join(", ")}
                </p>
                <p className="text-[1.1rem]">
                  <strong>Session Fee Min:</strong> {selectedPost.sessionFeeMin}
                </p>
                <p className="text-[1.1rem]">
                  <strong>Session Fee Max:</strong> {selectedPost.sessionFeeMax}
                </p>
                <p className="text-[1.1rem]">
                  <strong>Hardship Considerations:</strong>{" "}
                  {selectedPost.hardshipConsiderations}
                </p>
                <p className="text-[1.1rem]">
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedPost.createdAt).toLocaleString()}
                </p>
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
      </Layout>
    </div>
  );
}

export default Posts;
