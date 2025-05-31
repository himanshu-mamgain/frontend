import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { getRoutes } from "./routes";
import type { IStoredData } from "./interface";

import "./App.css";

let logoutTimer: number;

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>();
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback(
    (token: string, userId: string, expirationDate: Date) => {
      setToken(token);
      setUserId(userId);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      // expirationDate || new Date(new Date().getTime() + 2000);

      setTokenExpirationDate(tokenExpirationDate);

      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId,
          token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData: IStoredData = JSON.parse(
      localStorage.getItem("userData")!
    );
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

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
