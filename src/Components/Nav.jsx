import React, { useContext } from 'react';
import { ProductContext } from '../utils/Context';
import { Link } from 'react-router-dom';

function Nav() {
  const [products] = useContext(ProductContext);

  let distinct_category = products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];
  console.log(distinct_category);
    // here we will retrive the color from 0 255 because the color no are from 0 to 255 and the to fixed is is used because to ibtain in decimal 0.4 is used for thikse dikhane ke liye  here it used for showing random color in back ground
  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},
    ${(Math.random() * 255).toFixed()},
    ${(Math.random() * 255).toFixed()}, 0.4)`;
  };
  console.log(color());

  return (
    <nav className="w-[15%] h-full bg-zinc-50 flex flex-col items-center pt-5">
      <a
        className="py-2 px-5 border rounded border-blue-300 text-blue-300"
        href="/create"
      >
        Add new product
      </a>
      <hr className="w-[80%] my-3" />
      <h1 className="text-2xl font-semibold mb-3 w-[80%]">Category Filter</h1>
      <div className="w-[80%]">
        {distinct_category.map((category, index) => (
          <Link
            key={index}
            to={`/?category=${category}`}
            className="mb-3 flex items-center hover:text-blue-300"
          >
            <span
              style={{ backgroundColor: color() }}
              className="rounded-full mr-2 flex w-[15px] h-[15px]"
            ></span>
            {category}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Nav;

 
 
 