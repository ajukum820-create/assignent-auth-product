import React, { useState } from "react";
import useApi from "../../shared/useApi";
import { useAuthContext } from "../context/authProvider";
import { useNavigate } from "react-router";

const Register = () => {
  const api = useApi();
  const authContext = useAuthContext();
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Confirm password error
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Form submit handle karna
  async function handleSubmit(event) {
    event.preventDefault();

    // Password aur Confirm Password match kar rahe hain ya nahi
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    // Agar passwords match hain to error remove kar do
    setConfirmPasswordError("");

    const response = await api.post("/auth/register", {
      name,
      email,
      password,
      confirmPassword,
    });

    console.log("SUCCESS:", response.data);

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    // Access token ko AuthContext mein save karna
    authContext.setAccessToken(response.data.accessToken);

    // Logged-in user ki information save karna
    authContext.setUser(response.data.data.user);

    // Login page par navigate karna
    navigate("/login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>

          <p className="text-gray-500 mt-2">
            Register to start using the application
          </p>
        </div>

        {/* Register Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>

            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

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
              placeholder="Enter your email"
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
              placeholder="Enter your password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>

            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />

            {/* Confirm Password Error */}
            {confirmPasswordError && (
              <p className="text-red-500 text-sm mt-1">
                {confirmPasswordError}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </main>
  );
};

export default Register;
