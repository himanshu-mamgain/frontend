import { BrowserRouter as Router, Routes } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { getRoutes } from "./routes";
import { useAuth } from "./shared/hooks/auth-hook";

import "./App.css";

function App() {
  const { token, login, logout, userId } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Routes>{getRoutes(!!token)}</Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
