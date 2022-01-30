import { User, UserCredentials, useUser } from "context/UserContext";
import React from "react";
import { login as loginCall } from "api/account";
import { useMutation } from "react-query";
import { Title } from "components";
import { showToast } from "components/ToastContainer";
import UserForm from "features/account/UserForm";
import { Link } from "react-router-dom";
const classWrapper = "w-full sm:w-2/3 md:w-1/2 lg:w-1/2 2xl:w-1/3 relative";
const background = "h-full absolute transform";

const flexCenterAll = "flex flex-col justify-center items-center";
const Login = () => {
  const { dispatch } = useUser();
  const { mutate: loginMutation } = useMutation<
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
      const errorData = error?.message;
      showToast(errorData, { type: "error" });
    },
  });

  return (
    <div className={`${flexCenterAll} w-full h-full`}>
      <div className={`${classWrapper} mb-4`}>
        <div
          className={`${background} w-5/12  bg-yellow-400  -translate-y-2`}
        ></div>
        <Title className="mb-4 relative">Logowanie</Title>
      </div>
      <UserForm backendCall={loginMutation} />
      <div className="flex mt-3 text-purple-400">
        <Link to="/register" className="mr-2">
          Zarejestruj się
        </Link>
        <Link to="/restore">Odzyskaj hasło</Link>
      </div>
    </div>
  );
};

export default Login;
