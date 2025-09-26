import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${apiUrl}/api/auth/${isSignup ? "signup" : "login"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Authentication failed");

      if (!isSignup && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/"); // SPA navigation
      } else if (isSignup) {
        setIsSignup(false);
        setEmail("");
        setPassword("");
        setError("Signup successful! Please login.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs p-6 border rounded bg-white shadow"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        {error && <div className="text-red-500 mb-2">{error}</div>}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
        </button>

        <div className="mt-3 text-center">
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={() => !loading && setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
