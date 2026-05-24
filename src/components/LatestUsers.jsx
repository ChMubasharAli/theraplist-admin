import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

const UserTable = ({ users }) => {
  return (
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
              Practice Type
            </TableCell>
            <TableCell sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Areas of Specialty
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell sx={{ fontSize: "1.1rem" }}>
                {user.firstName}
              </TableCell>
              <TableCell sx={{ fontSize: "1.1rem" }}>{user.lastName}</TableCell>
              <TableCell sx={{ fontSize: "1.1rem" }}>{user.email}</TableCell>
              <TableCell sx={{ fontSize: "1.1rem" }}>
                {user.practiceType}
              </TableCell>
              <TableCell sx={{ fontSize: "1.1rem" }}>
                {user.areasOfSpecialty.join(", ")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const LatestUsers = () => {
  const [sampleUsers, setSampleUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/getProvidersForDashboard`,
      );
      const data = await response.json();
      setSampleUsers(data); // Fix typo: `date` -> `data`
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6 bg-white BoxShadow p-5">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Latest Users</h1>
        <Link
          to={"/Clients"}
          className="text-[#00303A] px-5 py-2 rounded-md font-semibold text-[1.2rem] hovetransition-all ease-in-out duration-200"
        >
          View More
        </Link>
      </div>
      <UserTable users={sampleUsers} />
    </div>
  );
};

export default LatestUsers;
