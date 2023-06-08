import React, { useContext, useState } from "react";
import AuthContext from "../helpers/AuthContext";
// import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { setUserId } = useContext(AuthContext); // Destructure setUserId from the AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_SERVER + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_email: email, user_password: password }),
      });

      if (response.ok) {
        // Handle successful login
        const data = await response.json();
        // onSuccess(data.user_id); if you want to lift instead of using useContext
        console.log(data);
        const payload = jwt_decode(data.accessToken);
        setUserId(payload.id); // Update the user id in the context
        navigate("/home");
        alert("Login successful");
      } else {
        // Handle login error
        const errorData = await response.json();
        setError(errorData.msg);
      }
    } catch (error) {
      console.error(error);
      setError("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
