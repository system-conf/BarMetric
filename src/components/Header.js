import React from "react";
import { Link, Navigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Header = ({ darkMode, toggleDarkMode }) => {
  const handleLogout = () => {
    firebase.auth().signOut();
    return <Navigate to="/" />;
  };

  return ( 
    <nav className={`flex lg:px-96 justify-between items-center p-4 bg-gray-200 ${darkMode ? "bg-stone-800 text-white" : "bg-gray-500 text-gray-800"}`}>
      <div className="flex space-x-4">
        <Link to="/" className="text-lg font-bold">
          Ana Sayfa
        </Link>
        <Link to="/hesaplayici" className="text-lg font-bold">
          Hesaplayıcı
        </Link>
        <Link to="/RecipeList" className="text-lg font-bold">
        RecipeList
        </Link>
      </div>
      <div className="flex space-x-4 items-center">
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Çıkış Yap
        </button>
      </div>
    </nav>
  );
};

export default Header;
