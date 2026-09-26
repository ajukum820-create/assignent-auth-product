import React, { useState } from "react";
import { useNavigate } from "react-router";
import useApi from "../../../shared/useApi";

const AddProduct = () => {
  // API call ke liye
  const api = useApi();

  // Product create hone ke baad products page par jane ke liye
  const navigate = useNavigate();


  // PRODUCT FORM STATES
 

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState([]);
  const [stock, setStock] = useState("");

  // Loading ke liye
  const [loading, setLoading] = useState(false);



  function handleSizeChange(event) {
    const value = event.target.value;

    if (event.target.checked) {
      setSize([...size, value]);
    } else {
      setSize(size.filter((item) => item !== value));
    }
  }

  // FORM SUBMIT
 

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    try {
      // Backend ko product data bhejna
      const response = await api.post("/products", {
        title,
        description,
        price: Number(price),
        category,
        size,
        stock: Number(stock),
      });

      console.log("Product created:", response.data);

      // Form clear
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setSize([]);
      setStock("");

      navigate("/products");
    } catch (error) {
      
      console.log("Create product error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-md bg-gray-100 flex justify-center p-4">
      {/* FORM CONTAINER */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-5 h-fit">

        {/* HEADING */}
        <h1 className="text-2xl font-bold text-gray-800 mb-5">
          Create Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter product title"
              className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
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
              placeholder="Enter product description"
              rows="3"
              className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
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
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
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
              placeholder="Enter category"
              className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* SIZE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size
            </label>

            <div className="flex gap-4">

              {/* X */}
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  value="X"
                  checked={size.includes("X")}
                  onChange={handleSizeChange}
                  className="w-4 h-4"
                />
                X
              </label>

              {/* M */}
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  value="M"
                  checked={size.includes("M")}
                  onChange={handleSizeChange}
                  className="w-4 h-4"
                />
                M
              </label>

              {/* L */}
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  value="L"
                  checked={size.includes("L")}
                  onChange={handleSizeChange}
                  className="w-4 h-4"
                />
                L
              </label>

              {/* XL */}
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  value="XL"
                  checked={size.includes("XL")}
                  onChange={handleSizeChange}
                  className="w-4 h-4"
                />
                XL
              </label>

              {/* XXL */}
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  value="XXL"
                  checked={size.includes("XXL")}
                  onChange={handleSizeChange}
                  className="w-4 h-4"
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
              placeholder="Enter stock"
              className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>

        </form>
      </div>
    </main>
  );
};

export default AddProduct;
