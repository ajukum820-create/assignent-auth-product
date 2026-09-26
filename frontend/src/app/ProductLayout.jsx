import React from "react";
import { Outlet } from "react-router";
import Navbar from "../modules/shared/Navbar";

const ProductLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ProductLayout;
