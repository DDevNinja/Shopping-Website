// Context.js

import React, { createContext, useEffect, useState } from "react";
import axios from "./axios"; // Make sure this file exists and is correctly configured

export const ProductContext = createContext();

function Context(props) {
  // Load from localStorage first
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem("products");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse products from localStorage:", error);
      return [];
    }
  });

  // Uncomment below code if you want to fetch products from an API
  
  // const getProducts = async () => {
  //   try {
  //     const { data } = await axios.get("/products"); // Use .get() explicitly
  //     console.log("Fetched products:", data); // Log the result
  //     setProducts(data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error); // Improved error log
  //   }
  // };

  // useEffect(() => {
  //   getProducts();
  // }, []);
  
  // Keep localStorage updated whenever products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <ProductContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
}

export default Context;
