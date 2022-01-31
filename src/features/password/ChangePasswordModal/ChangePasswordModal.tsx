import React, { useEffect, useState } from "react";
import Modal, { ModalProps } from "components/Modal";
import { Button, Input } from "components";
import { useMutation } from "react-query";
import { change } from "api/account";

type ChangePasswordProps = Omit<ModalProps, "children">;

const ChangePasswordModal = ({ ...props }: ChangePasswordProps) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const {
    mutate: showPasswordMutation,
    data,
    error,
    reset,
  } = useMutation(() => change({ login, password, oldPassword }));

  useEffect(() => {
    setPassword("");
    setOldPassword("");
    setLogin("");
    reset();
  }, [props.isOpen, reset]);

  return (
    <Modal {...props}>
      <Input
        value={login}
        onChange={setLogin}
        type="text"
        className="mb-2"
        htmlFor="login"
        label={"Login"}
      />
      <Input
        value={oldPassword}
        onChange={setOldPassword}
        type="password"
        className="mb-2"
        htmlFor="oldPassword"
        label={"Stare hasło"}
      />
      <Input
        value={password}
        onChange={setPassword}
        type="password"
        className="mb-2"
        htmlFor="password"
        label={"Nowe hasło"}
      />
      {data && (
        <>
          <p className="mb-2 text-green-500">{data?.message}</p>
          <p className="mb-2 text-xl text-green-500">{`Klucz przywracający: ${data?.restorationKey}`}</p>
        </>
      )}
      {error && <p className="mb-2 text-red-500">{(error as any)?.message}</p>}
      <Button onClick={showPasswordMutation}>Zmień</Button>
    </Modal>
  );
};

export default ChangePasswordModal;
