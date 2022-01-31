import React from "react";
import { useUser } from "context/UserContext";

const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));
const UnauthenticatedApp = React.lazy(() => import("./UnauthenticatedApp"));

const Router = () => {
  const { isLoggedIn } = useUser();

  return isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default Router;
