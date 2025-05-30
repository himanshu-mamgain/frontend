import { createContext } from "react";
import type { IAuthContext } from "../../interface";

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
});
