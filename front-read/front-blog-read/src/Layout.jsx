import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import './layout.css'

function Layout() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        title="Blog API (Odin Project)"
      />
      <main className="flex-grow p-4">
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
      <Footer />
    </div>
  );
}


export default Layout
