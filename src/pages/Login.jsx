import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/register`,
        {
          email,
          password,
        },
      );

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", email);
        navigate("/");
        alert("Login successful!");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00303A]">
      <div className="w-full max-w-md bg-[#d9d9d9] opacity-80 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#00303A] mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-[#00303A] font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-[#00303A] rounded-md focus:outline-none focus:border-[#00303A]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-[#00303A] font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-[#00303A] rounded-md focus:outline-none focus:border-[#00303A]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute inset-y-0 right-3 flex items-center text-[#00303A]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00303A] text-[#d9d9d9] font-bold py-2 px-4 rounded-md hover:bg-[#001f26] transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
