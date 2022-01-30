import { UserCredentials } from "context/UserContext";
import { client } from "./client";

export const login = (body: UserCredentials) => {
  return client("user/login", { body });
};

export const register = (body: UserCredentials) => {
  return client("user/register", { body });
};

export const restore = (body: UserCredentials) => {
  return client("user/restore", { body, method: "PUT" });
};
