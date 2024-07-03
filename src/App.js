import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Login from "./Login";
import Hesaplayici from "./pages/uploud/BarmenHesaplayici";
import RecipeList from "./pages/list/RecipeList";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const AppContent = ({ darkMode, toggleDarkMode, currentUser }) => {
  const location = useLocation();
  const hideHeaderPaths = ["/"];

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      {!hideHeaderPaths.includes(location.pathname) && (
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home currentUser={currentUser} />} />
        <Route path="/RecipeList" element={<RecipeList currentUser={currentUser} />} />
        <Route
          path="/hesaplayici"
          element={<Hesaplayici darkMode={darkMode} currentUser={currentUser} />}
        />
        
      </Routes>
      {!hideHeaderPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Firebase user authentication state observer
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    // Cleanup subscription on unmount
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
