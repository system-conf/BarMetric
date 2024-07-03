import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    firebase.auth().signOut();
    return <Navigate to="/" />;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`flex lg:px-64 flex-col lg:flex-row justify-between items-center p-4 ${darkMode ? "bg-stone-800 text-white" : "bg-gray-500 text-gray-800"}`}>
      <div className="flex justify-between items-center w-full lg:w-auto">
        <div className="flex space-x-4">
          <Link to="/" className="text-lg font-bold">
            Ana Sayfa
          </Link>
        </div>
        <button onClick={toggleMenu} className="lg:hidden text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div className={`lg:flex flex-col w-full lg:flex-row lg:space-x-4 mt-4 lg:mt-0 ${isOpen ? "flex" : "hidden"}`}>
        <Link to="/hesaplayici" className="text-lg font-bold">
          Hesaplayıcı
        </Link>
        <Link to="/RecipeList" className="text-lg font-bold">
          RecipeList
        </Link>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-blue-500 text-white rounded flex items-center mt-4 lg:mt-0"
        >
          {darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
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
