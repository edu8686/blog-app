// src/components/Layout.jsx
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  const token = localStorage.getItem("token");
  return (
    <div className="flex flex-col min-h-screen">
      <Header
        title="Blog API (Odin Project)"
        token={token}
      />
      <main className="flex-grow p-4">
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
