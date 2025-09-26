import React, { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Redirect logged-in user automatically
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redirect to home/dashboard if already logged in
    }
  }, [navigate]);

  const handleAuthSuccess = (data) => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      setUser(data);
      navigate("/"); // Redirect after successful login/signup
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm onAuthSuccess={handleAuthSuccess} />
    </div>
  );
};

export default AuthPage;
