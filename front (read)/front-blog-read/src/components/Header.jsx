
// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";


const Header = ({ title }) => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;
