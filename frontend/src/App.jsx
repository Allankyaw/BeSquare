import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/Homepage";
import RegisterPage from "./pages/RegisterPage";
import Logo from "./components/Logo";
import AuthContext from "./helpers/AuthContext";
import { Navigate } from "react-router-dom";

const App = () => {
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      userId {userId}
      <div className="app">
        <Logo />
        <AuthContext.Provider value={{ userId, setUserId }}>
          <Routes>
            <Route
              exact
              path="/"
              element={userId ? <Navigate to="/home" /> : <LoginPage />}
            />
            <Route
              path="/home"
              element={userId ? <HomePage /> : <Navigate to="/" />}
            />
            <Route path="/register" element={<RegisterPage />} />
            {/* Add more routes for other pages/components */}
          </Routes>
        </AuthContext.Provider>
      </div>
    </Router>
  );
};

export default App;
