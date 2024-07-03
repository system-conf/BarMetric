import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Login = () => {
  const currentUser = firebase.auth().currentUser;
  const [redirectToUpload, setRedirectToUpload] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setRedirectToUpload(true);
    }
  }, [currentUser]);

  if (redirectToUpload) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <LoginForm setRedirectToUpload={setRedirectToUpload} />
    </div>
  );
};

const LoginForm = ({ setRedirectToUpload }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setSuccessMessage("Başarılı giriş!");
      setRedirectToUpload(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setSuccessMessage("Başarılı kayıt!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-stone-700  rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Giriş Yap</h2>
        <div className="space-y-4 ">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 text-stone-950 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300  text-stone-950  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-between space-x-4">
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Giriş Yap
            </button>
            {/* <button
              onClick={handleRegister}
              className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Kayıt Ol
            </button> */}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
