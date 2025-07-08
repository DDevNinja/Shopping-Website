import React from "react";
import Home from "./Components/Home";
import Create from "./Components/Create";
import Details from "./Components/Details";
import Edit from "./Components/Edit";
import { Link, Route, Routes, useLocation } from "react-router-dom";

function App() {
  const { search, pathname } = useLocation();

  return (
    <div className="h-screen w-screen flex">
      {/* Show Nav Links only when not on Home without query */}
      {(pathname !== "/" || search.length > 0) && (
        <>
          <Link to="/" className="text-red-300 absolute left-[17%] top-[3%]">Home</Link>
          <Link to="/create" className="absolute left-[25%] top-[3%]">Create</Link>
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
