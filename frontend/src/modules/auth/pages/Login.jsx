import React, { useState } from "react";
import useApi from "../../shared/useApi";
import { useAuthContext } from "../context/authProvider";
import { useNavigate } from "react-router";

const Login = () => {
  const api = useApi();
  const authContext = useAuthContext();
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Form submit handler
  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post("/auth/login", {
      email,
      password,
    });

    console.log("Success", response.data);

    // Access token ko AuthContext mein save karna
    authContext.setAccessToken(response.data.accessToken);

    // Logged-in user ki information save karna
    authContext.setUser(response.data.data.user);

    // Form fields empty karna
    setEmail("");
    setPassword("");

    // Products page par jana
    navigate("/products/add");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Login Account</h1>
        </div>

        {/* Login Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-500 mt-2">
            Don't have an account?
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
