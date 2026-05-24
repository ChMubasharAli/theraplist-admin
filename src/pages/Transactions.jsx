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

function Transactions() {
  // Rename state variables to reflect transactions
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1); // Material UI Pagination is 1-indexed
  const [rowsPerPage] = useState(10); // Fixed rows per page
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true); // Start loader
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/getAllTransactions`,
        );
        const data = await response.json();
        console.log("Fetched Transactions:", data);
        // Ensure data.transactions exists and is an array
        if (Array.isArray(data.transactions)) {
          // Sort the transactions by 'createdAt' in descending order
          const sortedTransactions = data.transactions.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );
          setTransactions(sortedTransactions);
        } else {
          console.error(
            "No transactions field in response or it is not an array",
          );
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false); // Stop loader
      }
    };

    fetchTransactions();
  }, []);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate which rows to display based on pagination
  const paginatedData = transactions.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  // Delete transaction function
  const handleDeleteTransaction = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?",
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/deleteTransactionById/${id}`,
          {
            method: "DELETE",
          },
        );
        if (response.ok) {
          // Update the transactions state to remove the deleted transaction
          setTransactions(
            transactions.filter((transaction) => transaction.id !== id),
          );
          console.log("Transaction deleted successfully");
        } else {
          console.error("Failed to delete transaction");
          const errorData = await response.json();
          alert(
            `Failed to delete transaction: ${errorData.message || "Unknown error"}`,
          );
        }
      } catch (error) {
        console.error("Error deleting transaction:", error);
        alert("An error occurred while deleting the transaction.");
      }
    }
  };

  return (
    <div className="overflow-auto">
      <Layout>
        <div className="px-4 pt-12">
          <h1 className="font-bold text-3xl">Transactions</h1>
        </div>
        <div>
          <div className="p-5 pt-16">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {/* Define table headers based on transaction data */}
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Transaction ID
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      User Name
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Email
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Amount
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Currency
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Status
                    </TableCell>
                    {/* <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Receipt</TableCell> */}
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Created At
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    // Show loader while data is being fetched
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        style={{
                          textAlign: "center",
                          color: "#00303A",
                          height: "80vh",
                        }}
                      >
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : transactions.length === 0 ? (
                    // Show message if no transactions are available
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        style={{ textAlign: "center", color: "#00303A" }}
                      >
                        No transactions available.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedData.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell sx={{ fontSize: "1.1rem" }}>
                          {transaction.id}
                        </TableCell>
                        <TableCell sx={{ fontSize: "1.1rem" }}>
                          {transaction.user.firstName}{" "}
                          {transaction.user.lastName}
                        </TableCell>
                        <TableCell sx={{ fontSize: "1.1rem" }}>
                          {transaction.user.email}
                        </TableCell>
                        <TableCell sx={{ fontSize: "1.1rem" }}>
                          {(transaction.amount / 100).toLocaleString()}{" "}
                          {/* Assuming amount is in cents */}
                        </TableCell>
                        <TableCell sx={{ fontSize: "1.1rem" }}>
                          {transaction.currency.toUpperCase()}
                        </TableCell>
                        <TableCell sx={{ fontSize: "1.1rem" }}>
                          {transaction.status}
                        </TableCell>
                        {/* <TableCell sx={{ fontSize: '1.1rem' }}>
                                                    {transaction.receiptUrl ? (
                                                        <a href={transaction.receiptUrl} target="_blank" rel="noopener noreferrer">
                                                            View Receipt
                                                        </a>
                                                    ) : (
                                                        'N/A'
                                                    )}
                                                </TableCell> */}
                        <TableCell sx={{ fontSize: "1.1rem" }}>
                          {new Date(transaction.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() =>
                              handleDeleteTransaction(transaction.id)
                            }
                            aria-label="delete"
                          >
                            <MdDelete style={{ color: "#FF0000" }} />{" "}
                            {/* Red color for delete icon */}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
              <Pagination
                count={Math.ceil(transactions.length / rowsPerPage)} // Total number of pages
                page={page}
                onChange={handleChangePage}
                shape="rounded" // Rounded pagination buttons
                size="large" // Large size
                color="primary" // You can customize color as needed
                sx={{
                  "& .MuiPaginationItem-root": {
                    bgcolor: "#00303A", // Background color of the pagination boxes
                    color: "white", // Text color
                  },
                  "& .MuiPaginationItem-root:hover": {
                    bgcolor: "#005052", // Background color on hover
                  },
                  "& .Mui-selected": {
                    bgcolor: "#FF0000 !important", // Highlight selected page (example: red)
                    color: "white !important",
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

export default Transactions;
