import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleAuthSuccess = (data) => {
    // Save token to localStorage or context
    if (data.token) {
      localStorage.setItem("token", data.token);
      setUser(data);
      // Redirect to home or admin page
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm onAuthSuccess={handleAuthSuccess} />
    </div>
  );
};

export default AuthPage;
