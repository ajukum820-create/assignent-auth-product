import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useApi from "../../../shared/useApi";

const EditProduct = () => {
  const api = useApi();
  const navigate = useNavigate();

  // URL se product id
  const { id } = useParams();

  // Product fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState([]);
  const [stock, setStock] = useState("");

  // Loading states
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // GET PRODUCT
  async function getProduct() {
    try {
      const response = await api.get(`/products/${id}`);

      console.log("Product:", response.data);

      const product = response.data.product;

      // Existing data form mein set karna
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setSize(product.size || []);
      setStock(product.stock);

    } catch (error) {
      console.log("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  }

  // Page open hote hi product fetch
  useEffect(() => {
    getProduct();
  }, [id]);


  function handleSizeChange(event) {
    const value = event.target.value;

    if (event.target.checked) {
      setSize([...size, value]);
    } else {
      setSize(size.filter((item) => item !== value));
    }
  }

  // UPDATE PRODUCT

  async function handleSubmit(event) {
    event.preventDefault();

    setUpdating(true);

    try {
      const response = await api.put(`/products/${id}`, {
        title,
        description,
        price: Number(price),
        category,
        size,
        stock: Number(stock),
      });

      console.log("Product updated:", response.data);

      // Update ke baad details page
      navigate(`/products/${id}`);

    } catch (error) {
      console.log("Failed to update product:", error);
    } finally {
      setUpdating(false);
    }
  }

  // LOADING

  if (loading) {
    return <h1>Loading product...</h1>;
  }

  // UI

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-4">

        <h1 className="text-xl font-bold text-gray-800 mb-4">
          Edit Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-2"
        >

          {/* TITLE */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full border border-gray-300 rounded-lg p-1.5 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows="2"
              className="w-full border border-gray-300 rounded-lg p-1.5 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          {/* PRICE */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>

            <input
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="w-full border border-gray-300 rounded-lg p-1.5 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* CATEGORY */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>

            <input
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full border border-gray-300 rounded-lg p-1.5 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* SIZE */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size
            </label>

            <div className="flex gap-4">

              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value="X"
                  checked={size.includes("X")}
                  onChange={handleSizeChange}
                />
                X
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value="M"
                  checked={size.includes("M")}
                  onChange={handleSizeChange}
                />
                M
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value="L"
                  checked={size.includes("L")}
                  onChange={handleSizeChange}
                />
                L
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value="XL"
                  checked={size.includes("XL")}
                  onChange={handleSizeChange}
                />
                XL
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value="XXL"
                  checked={size.includes("XXL")}
                  onChange={handleSizeChange}
                />
                XXL
              </label>

            </div>
          </div>

          {/* STOCK */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>

            <input
              type="number"
              value={stock}
              onChange={(event) => setStock(event.target.value)}
              className="w-full border border-gray-300 rounded-lg p-1.5 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* UPDATE BUTTON */}

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-blue-600 text-white font-semibold py-1.5 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {updating ? "Updating..." : "Update Product"}
          </button>

        </form>

      </div>

    </main>
  );
};

export default EditProduct;

