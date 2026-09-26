import { createBrowserRouter } from "react-router";

import Register from "../modules/auth/pages/Register";
import Login from "../modules/auth/pages/Login";

import AddProduct from "../modules/auth/products/pages/AddProduct";
import ProductDetails from "../modules/auth/products/pages/ProductDetails";
import EditProduct from "../modules/auth/products/pages/EditProduct";
import Products from "../modules/auth/products/pages/Products";

import ProductLayout from "./ProductLayout";

const router = createBrowserRouter([
  // Auth pages
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  // Product pages
  {
    element: <ProductLayout />,
    children: [
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/add",
        element: <AddProduct />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/products/:id/edit",
        element: <EditProduct />,
      },
    ],
  },
]);

export default router;
