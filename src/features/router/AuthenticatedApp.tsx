import React from "react";
import { Route, Routes } from "react-router-dom";

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route path={"/"} element={<></>} />
    </Routes>
  );
};

export default AuthenticatedApp;
