import React from "react";
import { useUser } from "context/UserContext";

const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));
const UnauthenticatedApp = React.lazy(() => import("./UnauthenticatedApp"));

const Router = () => {
  const { isLoggedIn } = useUser();
  console.log(isLoggedIn);
  return isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default Router;
