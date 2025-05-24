import { useCallback, useState } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { getRoutes } from "./routes";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Routes>{getRoutes(isLoggedIn)}</Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
