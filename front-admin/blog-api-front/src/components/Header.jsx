import { Link } from "react-router-dom";
const Header = ({ title, token, setToken }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null); // avisamos a React
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center">
      <h1 className="text-xl font-bold flex-1 text-center">{title}</h1>
      <nav className="absolute right-4">
        {token && (
          <Link to={"/home"} className="mr-4">
            Home
          </Link>
        )}
        {token && (
          <Link onClick={handleLogout} to={"/"}>
            Log out
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
