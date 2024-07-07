import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Login from "./Login";
import Hesaplayici from "./pages/uploud/BarmenHesaplayici";
import RecipeList from "./pages/list/RecipeList";
import EditRecipe from "./pages/edit/EditRecipe";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const AppContent = ({ darkMode, toggleDarkMode, currentUser }) => {
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
          <Route path="/home" element={<Home darkMode={darkMode} currentUser={currentUser} />} />
          <Route path="/RecipeList" element={<RecipeList darkMode={darkMode} currentUser={currentUser} />} />
          <Route path="/hesaplayici" element={<Hesaplayici darkMode={darkMode} currentUser={currentUser} />} />
          <Route path="/edit/:recipeName" element={<EditRecipe darkMode={darkMode} />} />
        </Routes>
      </div>
      {!hideHeaderPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <AppContent darkMode={darkMode} toggleDarkMode={toggleDarkMode} currentUser={currentUser} />
    </Router>
  );
};

export default App;
