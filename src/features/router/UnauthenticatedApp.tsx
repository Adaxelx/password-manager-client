import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RestorePassword from "features/account/RestorePassword";
import Login from "features/account/Login";
import Register from "features/account/Register";

const UnauthenticatedApp = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/restore"} element={<RestorePassword />} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default UnauthenticatedApp;
