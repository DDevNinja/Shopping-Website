import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // Added navigate
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";

function Details() {
  const [products, setproducts] = useContext(ProductContext); // Access both state and setter
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); // For redirect after delete

  useEffect(() => {
    // Find the product by ID from the context
    if (!product) {
      const found = products.find((p) => String(p.id) === id);
      setProduct(found || null);
    }
  }, [id, product, products]);

  // ✅ Corrected Delete Handler
  const ProductDeleteHandler = (id) => {
    const FilteredProducts = products.filter((p) => p.id !== id);
    setproducts(FilteredProducts); // ✅ Now updating the state correctly
    localStorage.setItem("products", JSON.stringify(FilteredProducts)); // Sync with localStorage
    navigate("/"); // ✅ Redirect to home after deletion
  };

  return product ? (
    <div className="w-[70%] flex justify-between items-center h-full m-auto py-[10%]">
      <img
        className="mr-5 object-contain w-[40%] h-[80%]"
        src={product.image}
        alt={product.title}
      />
      <div className="content ml-5 w-[40%] h-[80%]">
        <h1 className="text-4xl mb-3">{product.title}</h1>
        <h2 className="text-red-300 mb-3">${product.price}</h2>
        <h3 className="text-zinc-400 my-5 capitalize">{product.category}</h3>
        <p className="mb-5">{product.description}</p>
        <Link to={`/edit/${product.id}`} className="py-2 px-5 border rounded border-blue-300 text-blue-300">
          Edit
        </Link>
        <button
          onClick={() => ProductDeleteHandler(product.id)}
          className="py-2 px-5 border rounded border-red-300 text-red-300 ml-5"
        >
          Delete
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Details;


// useEffect(() => {
//   const getSingleProduct = async () => {
//     try {
//       const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
//       console.log(data);
//       setProduct(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   getSingleProduct();
// }, [id]); // Depend on `id` in case it changes
