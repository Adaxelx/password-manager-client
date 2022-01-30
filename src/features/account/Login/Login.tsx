import { User, UserCredentials, useUser } from "context/UserContext";
import React, { FormEvent, useState } from "react";
import { login as loginCall } from "api/account";
import { useMutation } from "react-query";
import { Button, Input, Title } from "components";
import { showToast } from "components/ToastContainer";
const classWrapper = "w-full sm:w-2/3 md:w-1/2 lg:w-1/2 2xl:w-1/3 relative";

const background = "h-full absolute transform";

const backgroundBox = `w-7/12 ${background}`;
const flexCenterAll = "flex flex-col justify-center items-center";
const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useUser();
  const { mutate: loginMutation, isLoading } = useMutation<
    { token: string; user: User },
    any,
    UserCredentials,
    any
  >((credentials: UserCredentials) => loginCall(credentials), {
    onSuccess: ({ token, user }) =>
      dispatch({
        type: "login",
        payload: { token, user },
      }),
    onError: (error) => {
      const errorData = error?.message && JSON.parse(error?.message);
      showToast(errorData?.message, { type: "error" });
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation({ login, password });
  };

  return (
    <div className={`${flexCenterAll} w-full h-full`}>
      <div className={`${classWrapper} mb-4`}>
        <div
          className={`${background} w-5/12  bg-yellow-400  -translate-y-2`}
        ></div>
        <Title className="mb-4 relative">Logowanie</Title>
      </div>
      <div className={`${classWrapper}`}>
        <div className={`${backgroundBox} bg-cyan-400 translate-y-2`}></div>
        <div
          className={`${backgroundBox} right-0 bg-yellow-400 -translate-y-2`}
        ></div>
        <form
          className={`p-16 sm:p-24 ${flexCenterAll} relative`}
          onSubmit={handleSubmit}
        >
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
          <Button disabled={isLoading} type="submit">
            Zaloguj
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
