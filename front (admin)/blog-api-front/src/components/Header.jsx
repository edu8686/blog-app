// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../api";
import { useState, useEffect } from "react";

const Header = ({ title }) => {
  const [token, setToken] = useState(null);
  console.log("Token: ", token);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []); // Esto se ejecuta al montar

  // Opcional: escuchar cambios en localStorage
  useEffect(() => {
    const handleStorage = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">{title}</h1>
      <nav>
        {token ? <Link to={"/home"}> Home </Link> : ""}
        {token ? (
          <Link onClick={logout} to={"/"}>
            {" "}
            Log out{" "}
          </Link>
        ) : (
          ""
        )}
      </nav>
    </header>
  );
};

export default Header;
