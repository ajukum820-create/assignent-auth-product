
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useApi from "../../../shared/useApi";

const ProductDetails = () => {
  // API ke liye
  const api = useApi();

  // URL se product ID lene ke liye
  
  const { id } = useParams();

  // Navigation ke liye
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  // Loading ke liye
  const [loading, setLoading] = useState(true);

  // Error ke liye
  const [error, setError] = useState("");




  async function getProduct() {
    try {
      const response = await api.get(`/products/${id}`);

      console.log("Product:", response.data);

      setProduct(response.data.product);
    } catch (error) {
      console.log("Failed to fetch product:", error);

      setError(
        error.response?.data?.message ||
          "Failed to fetch product"
      );
    } finally {
      setLoading(false);
    }
  }


  // DELETE PRODUCT
 

  async function handleDelete() {
    try {
      await api.delete(`/products/${id}`);

      console.log("Product deleted successfully");

      navigate("/products");
    } catch (error) {
      console.log("Failed to delete product:", error);
    }
  }

  // Product fetch
  useEffect(() => {
    getProduct();
  }, [id]);

  // LOADING


  if (loading) {
    return <h1>Loading product...</h1>;
  }

  // ERROR


  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">{error}</p>

        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Back to Products
        </button>
      </div>
    );
  }


  // PRODUCT NOT FOUND

  if (!product) {
    return (
      <div className="p-6">
        <h1>Product not found</h1>

        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Back to Products
        </button>
      </div>
    );
  }

 



  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold mb-4">
          {product.title}
        </h1>

        <p className="text-gray-600 mb-4">
          {product.description}
        </p>

        <p className="text-xl font-semibold mb-2">
          ₹{product.price}
        </p>

        <p className="text-gray-700 mb-2">
          Category: {product.category}
        </p>

        <p className="text-gray-700 mb-2">
          Stock: {product.stock}
        </p>

        <p className="text-gray-700 mb-4">
          Size: {product.size?.join(", ")}
        </p>



        <div className="flex gap-3 mb-4">

          {/* EDIT */}

          <button
            onClick={() => navigate(`/products/${id}/edit`)}
            className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600"
          >
            Edit Product
          </button>

          {/* DELETE */}

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
          >
            Delete Product
          </button>

        </div>

        {/* BACK */}

        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Back to Products
        </button>

      </div>

    </main>
  );
};

export default ProductDetails;

