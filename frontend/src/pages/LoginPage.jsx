import React from "react";
import Login from "../components/login";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <Login />
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
