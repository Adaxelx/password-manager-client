import { UserCredentials } from "context/UserContext";
import { client } from "./client";

export const login = (body: UserCredentials) => {
  return client("user/login", { body });
};
