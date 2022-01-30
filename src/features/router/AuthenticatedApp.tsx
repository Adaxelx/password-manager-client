import React from "react";
import { Route, Routes } from "react-router-dom";
import PasswordList from "features/password/PasswordList";

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route path={"/"} element={<PasswordList />} />
    </Routes>
  );
};

export default AuthenticatedApp;
