import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../helpers/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/api/register",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // Authorization: "Bearer " + token,
          body: JSON.stringify({
            user_name: name,
            user_email: email,
            user_password: password,
          }),
        }
      );

      // Handle successful registration
      const data = await response.json();
      navigate("/");
      alert("Register successful");
    } catch (error) {
      // Handle registration error
      setError("Registration failed");
      console.error(error);
    }
  };

  return (
    <div className="text-center">
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <div className="container">
        <div className="row justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
