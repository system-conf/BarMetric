import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";


const Header = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    return <Navigate to="/" />;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    if (isOpen) {
      toggleMenu();
    }
  };

  return (
    <nav className={`flex lg:px-64 flex-col lg:flex-row justify-between items-center p-4 ${darkMode ? "bg-stone-800 text-white" : "bg-blue-500 text-gray-800"}`}>
      <div className="flex justify-between items-center w-full lg:w-auto">
        <div className="flex space-x-4">
          <Link to="/" className="text-lg font-bold" onClick={handleLinkClick}>
            BarMetric
          </Link>
        </div>
        <div className="flex items-center">
          <button onClick={toggleDarkMode} className="lg:hidden text-2xl mr-4">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button onClick={toggleMenu} className="lg:hidden text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      <div className={`lg:flex flex-col w-full lg:flex-row lg:space-x-4 mt-4 lg:mt-0 ${isOpen ? "flex" : "hidden"}`}>
        <Link to="/hesaplayici" className="text-lg font-bold" onClick={handleLinkClick}>
          Reçete Ekle
        </Link>
        <Link to="/RecipeList" className="text-lg font-bold mt-5" onClick={handleLinkClick}>
          Reçete listele / Güncelle
        </Link>
        {/* <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-blue-500 text-white rounded flex items-center mt-4 lg:mt-0"
        >
          {darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}

        </button> */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded mt-4 lg:mt-0"
        >
          Çıkış Yap
        </button>
      </div>
    </nav>
  );
};

export default Header;
