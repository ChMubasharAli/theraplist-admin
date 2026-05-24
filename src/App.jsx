import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Clients from './pages/Clients';
import Dashboard from './pages/Dashboard';
import Providers from './pages/Providers';
import Messages from './pages/Messages';
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import PrivateRoute from './PrivateRoute';
import Posts from './pages/Posts';
function App() {
  return (
    <Router>
      <Routes>
        {/* Public route for login */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/Clients"
          element={
            <PrivateRoute>
              <Clients />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <Posts />
            </PrivateRoute>
          }
        />
        <Route
          path="/Providers"
          element={
            <PrivateRoute>
              <Providers />
            </PrivateRoute>
          }
        />
        <Route
          path="/Messages"
          element={
            <PrivateRoute>
              <Messages />
            </PrivateRoute>
          }
        />
        <Route
          path="/Transactions"
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
