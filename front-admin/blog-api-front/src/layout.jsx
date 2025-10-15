
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

function Layout() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorage = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Blog API (Odin Project)" token={token} setToken={setToken} />
      <main className="flex-grow p-4">
        <Outlet context={{ token, setToken }} /> 
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
