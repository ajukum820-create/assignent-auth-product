import React from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../auth/context/authProvider";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, setUser, setAccessToken } = useAuthContext();

  function handleLogout() {
    setUser(null);
    setAccessToken(null);

    navigate("/login");
  }

  return (
    <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1
        onClick={() => navigate("/products")}
        className="text-xl font-bold cursor-pointer"
      >
        My Store
      </h1>

      {user && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
