import { Link, useLocation } from "react-router-dom";
import { Trophy, Home, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center px-2">
              <span className="text-xl font-bold text-white">
                JogoDaVelha
              </span>
            </Link>
          </div>
          
          {/* Menu para desktop */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                ${location.pathname === "/" 
                  ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-md hover:shadow-lg" 
                  : "text-white hover:text-purple-200"}`}
            >
              <Home className="w-4 h-4 mr-2" />
              Jogar
            </Link>
            <Link
              to="/ranking"
              className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                ${location.pathname === "/ranking" 
                  ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-md hover:shadow-lg" 
                  : "text-white hover:text-purple-200"}`}
            >
              <Trophy className="w-4 h-4 mr-2" />
              Ranking
            </Link>
          </div>

          {/* Botão do menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-purple-600/20"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-2 space-y-2">
            <Link
              to="/"
              className={`block px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                ${location.pathname === "/" 
                  ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-md" 
                  : "text-white"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center">
                <Home className="w-4 h-4 mr-2" />
                Jogar
              </span>
            </Link>
            <Link
              to="/ranking"
              className={`block px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                ${location.pathname === "/ranking" 
                  ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-md" 
                  : "text-white"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                Ranking
              </span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;