import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "features/account/Login";
import Register from "features/account/Register";

const UnauthenticatedApp = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default UnauthenticatedApp;
