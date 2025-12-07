import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Login from "./Login";
import Hesaplayici from "./pages/uploud/BarmenHesaplayici";
import RecipeList from "./pages/list/RecipeList";
import EditRecipe from "./pages/edit/EditRecipe";

const AppContent = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const hideHeaderPaths = ["/"];

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-stone-900 text-white" : "bg-white text-stone-900"}`}>
      {!hideHeaderPaths.includes(location.pathname) && (
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home darkMode={darkMode} />} />
          <Route path="/RecipeList" element={<RecipeList darkMode={darkMode} />} />
          <Route path="/hesaplayici" element={<Hesaplayici darkMode={darkMode} />} />
          <Route path="/edit/:recipeName" element={<EditRecipe darkMode={darkMode} />} />
        </Routes>
      </div>
      {!hideHeaderPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <AppContent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </Router>
  );
};

export default App;
