import { User, UserCredentials, useUser } from "context/UserContext";
import React, { useState } from "react";
import { restore as restoreCall } from "api/account";
import { useMutation } from "react-query";
import { Input, Title } from "components";
import { showToast } from "components/ToastContainer";
import { useNavigate } from "react-router";
import UserForm from "../UserForm";
import { Link } from "react-router-dom";

type RestoreProps = UserCredentials & { restorationKey: string };

const classWrapper = "w-full sm:w-2/3 md:w-1/2 lg:w-1/2 2xl:w-1/3 relative";

const background = "h-full absolute transform";

const flexCenterAll = "flex flex-col justify-center items-center";
const RestorePassword = () => {
  const [restorationKey, setRestorationKey] = useState("");
  const [message, setMessage] = useState("");

  const { mutate: restoreMutation } = useMutation<
    { restorationKey: string; message: string },
    any,
    RestoreProps,
    any
  >((credentials: RestoreProps) => restoreCall(credentials), {
    onSuccess: ({ restorationKey, message }) => {
      setMessage(`${message} Nowy klucz: ${restorationKey}`);
    },
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
        <Title className="mb-4 relative">Przywrócenie hasła</Title>
      </div>
      <UserForm
        otherInputs={
          <Input
            value={restorationKey}
            onChange={setRestorationKey}
            className="mb-2"
            htmlFor="restorationKey"
            label={"Klucz"}
          />
        }
        backendCall={({ login, password }) =>
          restoreMutation({ login, password, restorationKey })
        }
      />
      <p className="text-green-500 mt-3">{message}</p>
      <Link to="/login" className="mr-2 text-purple-400">
        Zaloguj się
      </Link>
    </div>
  );
};

export default RestorePassword;
