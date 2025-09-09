
// src/components/Footer.jsx
import React from "react";

const Footer = ({ text }) => {
  return (
    <footer className="bg-gray-900 text-gray-300 text-center p-4 mt-8">
      <p>{text}</p>
    </footer>
  );
};

export default Footer;
