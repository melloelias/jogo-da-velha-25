import { Link, useLocation } from "react-router-dom";
import { Trophy, Home } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center px-2 text-xl font-semibold">
              Tic Tac Toe
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${location.pathname === "/" 
                  ? "text-black bg-gray-100" 
                  : "text-gray-600 hover:text-black hover:bg-gray-50"}`}
            >
              <Home className="w-4 h-4 mr-2" />
              Play
            </Link>
            <Link
              to="/ranking"
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${location.pathname === "/ranking" 
                  ? "text-black bg-gray-100" 
                  : "text-gray-600 hover:text-black hover:bg-gray-50"}`}
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