import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";

function AddProduct() {
  const [products, setProducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();

  // State to hold product details
  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  // ✅ Update product state on input change
  const ChangeHandler = (e) => {
    setProduct({ ...product, [e.target.name.toLowerCase()]: e.target.value });
  };

  // ✅ Load product data from context based on ID
  useEffect(() => {
    const existingProduct = products.find((p) => p.id === id);
    if (existingProduct) {
      setProduct(existingProduct);
    }
  }, [id, products]);

  // ✅ Submit handler for editing the product
  const AddProductHandler = (e) => {
    e.preventDefault();

    // ✅ Form validation
    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.toString().trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("Each input must have at least 5 characters.");
      return;
    }

    // ✅ Find index of the product to update
    const index = products.findIndex((p) => p.id === id);

    if (index !== -1) {
      const updatedProducts = [...products];
      updatedProducts[index] = { ...updatedProducts[index], ...product };

      // ✅ Update context and localStorage
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      // ✅ Go back to previous page
      navigate(-1);
    }
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex flex-col items-center p-[5%] w-screen h-screen"
    >
      <h1 className="w-1/2 text-3xl mb-5">Edit Product</h1>

      <input
        type="text"
        placeholder="Title"
        className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        value={product.title}
        name="title"
        onChange={ChangeHandler}
      />
      <input
        type="url"
        placeholder="Image Link"
        className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        value={product.image}
        name="image"
        onChange={ChangeHandler}
      />

      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="Category"
          className="text-2xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          value={product.category}
          name="category"
          onChange={ChangeHandler}
        />
        <input
          type="number"
          placeholder="Price"
          className="text-2xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          value={product.price}
          name="price"
          onChange={ChangeHandler}
        />
      </div>

      <textarea
        placeholder="Enter the Description Here"
        className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        rows="6"
        value={product.description}
        name="description"
        onChange={ChangeHandler}
      />

      <div className="w-1/2">
        <button
          type="submit"
          className="py-2 px-5 border rounded border-blue-300 text-blue-300"
        >
          Update Product
        </button>
      </div>
    </form>
  );
}

export default AddProduct;
