import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="bg-white shadow flex items-center justify-between px-4 py-2 sticky top-0 z-50 border-b border-gray-200">
    <div className="flex items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">Home</Link>
    </div>
    <nav className="space-x-4">
      <Link to="/cart" className="text-gray-700 hover:text-blue-600 font-medium">Cart</Link>
    </nav>
  </header>
);

export default Header; 