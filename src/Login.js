import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


const Login = () => {
  const [redirectToHome, setRedirectToHome] = useState(false);

  if (redirectToHome) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <LoginForm setRedirectToHome={setRedirectToHome} />
    </div>
  );
};

const LoginForm = ({ setRedirectToHome }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Mock login - accept anything
    setRedirectToHome(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-900">
      <div className="w-full max-w-md p-8 space-y-6  rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-white">Giriş Yap</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
