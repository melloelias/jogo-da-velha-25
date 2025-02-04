import { Link, useLocation } from "react-router-dom";
import { Trophy, Home } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12">
          <div className="flex">
            <Link to="/" className="flex items-center px-2">
              <span className="text-xl font-bold text-white">
                JogoDaVelha
              </span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`inline-flex items-center px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-300
                ${location.pathname === "/" 
                  ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-md hover:shadow-lg" 
                  : "text-white hover:text-purple-200"}`}
            >
              <Home className="w-4 h-4 mr-2" />
              Jogar
            </Link>
            <Link
              to="/ranking"
              className={`inline-flex items-center px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-300
                ${location.pathname === "/ranking" 
                  ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-md hover:shadow-lg" 
                  : "text-white hover:text-purple-200"}`}
            >
              <Trophy className="w-4 h-4 mr-2" />
              Ranking
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;