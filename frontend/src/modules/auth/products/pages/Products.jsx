import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useApi from "../../../shared/useApi";

const Products = () => {
  const api = useApi();

  // Product details page par jane ke liye
  const navigate = useNavigate();

  // Products ko store karne ke liye
  const [products, setProducts] = useState([]);

  // Loading ke liye
  const [loading, setLoading] = useState(true);

  // Products backend se fetch karna
  async function getProducts() {
    try {
      const response = await api.get("/products");

      console.log("Products:", response.data);

      setProducts(response.data.products);
    } catch (error) {
      console.log("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <h1>Loading products...</h1>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow p-5">
            {/* PRODUCT TITLE */}
            <h2 className="text-xl font-bold">{product.title}</h2>

            {/* DESCRIPTION */}
            <p className="text-gray-600 mt-2">{product.description}</p>

            {/* PRICE */}
            <p className="font-semibold mt-3">₹{product.price}</p>

            {/* CATEGORY */}
            <p className="text-gray-600">Category: {product.category}</p>

            {/* STOCK */}
            <p className="text-gray-600">Stock: {product.stock}</p>

            {/* SEE DETAILS BUTTON */}
            <button
              onClick={() => navigate(`/products/${product._id}`)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              See Details
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Products;
