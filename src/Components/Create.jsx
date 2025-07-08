import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Create() {
  const navigate = useNavigate();
  const [products, setProducts] = useContext(ProductContext);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    category: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addProductHandler = (e) => {
    e.preventDefault();

    const { title, image, category, price, description } = formData;

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 5 ||
      price.trim().length < 1 ||
      description.trim().length < 5
    ) {
      alert("Each input must have at least 5 characters.");
      return;
    }

    const newProduct = {
      id: nanoid(),
      ...formData,
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    toast.success("Product added successfully!");

    // Clear the form
    setFormData({
      title: "",
      image: "",
      category: "",
      price: "",
      description: "",
    });

    navigate("/");
  };

  return (
    <form
      onSubmit={addProductHandler}
      className="flex flex-col items-center p-[5%] w-screen h-screen"
    >
      <h1 className="w-1/2 text-3xl mb-5">Add New Product</h1>

      <input
        type="text"
        name="title"
        placeholder="Title"
        className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        value={formData.title}
        onChange={handleChange}
      />
      <input
        type="url"
        name="image"
        placeholder="Image Link"
        className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        value={formData.image}
        onChange={handleChange}
      />

      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="text-2xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          value={formData.category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="text-2xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          value={formData.price}
          onChange={handleChange}
        />
      </div>

      <textarea
        name="description"
        placeholder="Enter the description here"
        className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        rows="6"
        value={formData.description}
        onChange={handleChange}
      ></textarea>

      <div className="w-1/2">
        <button
          type="submit"
          className="py-2 px-5 border rounded border-blue-300 text-blue-300"
        >
          Add New Product
        </button>
      </div>
    </form>
  );
}

export default Create;
