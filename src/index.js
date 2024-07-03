import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import firebase from "firebase/compat/app";
import "firebase/compat/storage"; 
import firebaseConfig from "./firebaseconf"; 

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
