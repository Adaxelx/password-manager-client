import React, { useEffect, useState } from "react";
import Modal, { ModalProps } from "components/Modal";
import { Button, Input } from "components";
import { useMutation, useQueryClient } from "react-query";
import { useUser } from "context/UserContext";
import { addPassword } from "api/password";

type AddPasswordProps = Omit<ModalProps, "children">;

const AddPasswordModal = ({ ...props }: AddPasswordProps) => {
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const {
    state: { user },
  } = useUser();

  const { mutate: addPasswordMutation, reset } = useMutation(
    () => addPassword({ key, name, password, userId: user?.id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes("passwordList"),
        });
        props.onClose();
      },
    }
  );

  useEffect(() => {
    setKey("");
    setName("");
    setPassword("");
    reset();
  }, [props.isOpen, reset]);

  return (
    <Modal {...props}>
      <Input
        value={name}
        onChange={setName}
        type="text"
        className="mb-2"
        htmlFor="name"
        label={"Serwis"}
      />
      <Input
        value={password}
        onChange={setPassword}
        type="password"
        className="mb-2"
        htmlFor="password"
        label={"Hasło"}
      />
      <Input
        value={key}
        onChange={setKey}
        type="password"
        className="mb-2"
        htmlFor="key"
        label={"Klucz zabezpieczający"}
      />
      {/* {data && (
        <p className="mb-2 text-green-500">{`Hasło to: ${data?.password}`}</p>
      )}
      {error && <p className="mb-2 text-red-500">{(error as any)?.message}</p>} */}
      <Button onClick={addPasswordMutation}>Dodaj</Button>
    </Modal>
  );
};

export default AddPasswordModal;
