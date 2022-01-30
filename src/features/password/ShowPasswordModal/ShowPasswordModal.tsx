import React, { useEffect, useState } from "react";
import Modal, { ModalProps } from "components/Modal";
import { Button, Input } from "components";
import { useMutation } from "react-query";
import { useUser } from "context/UserContext";
import { showPassword } from "api/password";

type ShowPasswordProps = { passwordId?: number } & Omit<ModalProps, "children">;

const ShowPasswordModal = ({ passwordId, ...props }: ShowPasswordProps) => {
  const [key, setKey] = useState("");
  const {
    state: { user },
  } = useUser();

  const {
    mutate: showPasswordMutation,
    data,
    error,
    reset,
  } = useMutation(() => showPassword({ passwordId, key, userId: user?.id }), {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    setKey("");
    reset();
  }, [props.isOpen, reset]);

  return (
    <Modal {...props}>
      <Input
        value={key}
        onChange={setKey}
        type="password"
        className="mb-2"
        htmlFor="klucz"
        label={"Klucz"}
      />
      {data && (
        <p className="mb-2 text-green-500">{`Hasło to: ${data?.password}`}</p>
      )}
      {error && <p className="mb-2 text-red-500">{(error as any)?.message}</p>}
      <Button onClick={showPasswordMutation}>Pokaż</Button>
    </Modal>
  );
};

export default ShowPasswordModal;
