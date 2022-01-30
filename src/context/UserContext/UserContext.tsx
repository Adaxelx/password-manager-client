import React, { ReactNode, useContext, useReducer } from "react";
import { tokenKey, userKey } from "constants/localStorageKeys";
export type UserCredentials = {
  login: string;
  password: string;
};

export type User = {
  login: string;
  id: number;
};

type State = { token: string; user?: User };
type Action = { type: "login"; payload: State } | { type: "logout" };
type Dispatch = (action: Action) => void;

interface UserProviderProps {
  children: ReactNode;
}

const UserStateContext = React.createContext<
  { state: State; dispatch: Dispatch; isLoggedIn: boolean } | undefined
>(undefined);

const user = window.localStorage.getItem("user");
const initialState: State = {
  token: window.localStorage.getItem(tokenKey) || "",
  user: user && JSON.parse(user),
};

function userReducer(state: State, action: Action) {
  switch (action.type) {
    case "login":
      window.localStorage.setItem("token", action.payload.token);
      window.localStorage.setItem("user", JSON.stringify(action.payload.user));
      return { ...state, ...action.payload };
    case "logout":
      window.localStorage.removeItem(tokenKey);
      window.localStorage.removeItem(userKey);
      return { ...state, token: "", user: undefined };
  }
}

function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { token, user } = state;
  const value = { state, dispatch, isLoggedIn: Boolean(token && user) };
  return (
    <UserStateContext.Provider value={value}>
      {children}
    </UserStateContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };
