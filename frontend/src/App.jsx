import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/Homepage";
import RegisterPage from "./pages/RegisterPage";
import Logo from "./components/Logo";

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <Router>
      <div className="app">
        <Logo />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <LoginPage
                setAccessToken={setAccessToken}
                // isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        {/* Add more routes for other pages/components */}
      </div>
    </Router>
  );
};

export default App;
