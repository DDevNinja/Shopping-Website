import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

function Home() {
  const [products] = useContext(ProductContext);

  const { search } = useLocation();

  // Decode URI to extract the category filter from query string
  const category = decodeURIComponent(search.split("=")[1] || "");

  const [filteredProducts, setFilteredProducts] = useState(products);

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // If a category is selected and valid, fetch the filtered products
    if (category && category !== "undefined") {
      
      // getProductsByCategory();
      setFilteredProducts(products.filter(p=> p.category== category));

    } else {
      // If no category or invalid, show all products
      setFilteredProducts(products);
    }
  }, [category, products]);

  console.log(filteredProducts);

  return products ? (
    <>
      <Nav />

      <div className="h-[66%] w-[74%] p-1 pt-[5%] flex flex-wrap gap-3 overflow-x-hidden overflow-y-auto">
        {filteredProducts &&
          filteredProducts.map((item, index) => (
            <Link
              key={index}
              to={`/Details/${item.id}`}
              className="card p-3 border shadow rounded w-[18%] h-[30vh] flex justify-center items-center flex-col"
            >
              <div
                className="hover:scale-x-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat"
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              ></div>
              <h1 className="text-center hover:text-blue-300">
                {item.title}
              </h1>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
