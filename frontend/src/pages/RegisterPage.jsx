import React from "react";
import { Link } from "react-router-dom";
import Register from "../components/register";

const RegisterPage = () => {
  return (
    <div>
      <Register />
      <p>
        Have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
