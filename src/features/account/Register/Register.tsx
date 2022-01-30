import { User, UserCredentials, useUser } from "context/UserContext";
import React from "react";
import { register as registerCall } from "api/account";
import { useMutation } from "react-query";
import { Title } from "components";
import { showToast } from "components/ToastContainer";
import { useNavigate } from "react-router";
import UserForm from "../UserForm";
const classWrapper = "w-full sm:w-2/3 md:w-1/2 lg:w-1/2 2xl:w-1/3 relative";

const background = "h-full absolute transform";

const flexCenterAll = "flex flex-col justify-center items-center";
const Register = () => {
  const { dispatch } = useUser();
  const navigate = useNavigate();
  const { mutate: registerMutation } = useMutation<
    { token: string; user: User },
    any,
    UserCredentials,
    any
  >((credentials: UserCredentials) => registerCall(credentials), {
    onSuccess: ({ token, user }) => {
      dispatch({
        type: "login",
        payload: { token, user },
      });
      navigate("/");
    },
    onError: (error) => {
      const errorData = error?.message && JSON.parse(error?.message);
      showToast(errorData?.message, { type: "error" });
    },
  });

  return (
    <div className={`${flexCenterAll} w-full h-full`}>
      <div className={`${classWrapper} mb-4`}>
        <div
          className={`${background} w-5/12  bg-yellow-400  -translate-y-2`}
        ></div>
        <Title className="mb-4 relative">Rejestracja</Title>
      </div>
      <UserForm backendCall={registerMutation} />
    </div>
  );
};

export default Register;
