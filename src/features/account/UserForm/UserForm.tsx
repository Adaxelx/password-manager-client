import { UserCredentials } from "context/UserContext";
import React, { FormEvent, ReactNode, useState } from "react";

import { Button, Input } from "components";
const classWrapper = "w-full sm:w-2/3 md:w-1/2 lg:w-1/2 2xl:w-1/3 relative";

const background = "h-full absolute transform";

const backgroundBox = `w-7/12 ${background}`;
const flexCenterAll = "flex flex-col justify-center items-center";

const UserForm = ({
  backendCall,
  otherInputs,
  actions,
}: {
  otherInputs?: ReactNode | ReactNode[];
  actions?: ReactNode | ReactNode[];
  backendCall: <T extends UserCredentials>(data: T) => void;
}) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    backendCall({ login, password });
  };

  return (
    <div className={`${classWrapper}`}>
      <div className={`${backgroundBox} bg-cyan-400 translate-y-2`}></div>
      <div
        className={`${backgroundBox} right-0 bg-yellow-400 -translate-y-2`}
      ></div>
      <form
        className={`p-16 sm:p-24 ${flexCenterAll} relative`}
        onSubmit={handleSubmit}
      >
        {otherInputs}
        <Input
          value={login}
          onChange={setLogin}
          className="mb-2"
          htmlFor="login"
          label={"Login"}
        />
        <Input
          value={password}
          onChange={setPassword}
          type="password"
          className="mb-4"
          htmlFor="password"
          label={"Hasło"}
        />
        <Button type="submit">Prześlij</Button>
      </form>
    </div>
  );
};

export default UserForm;
