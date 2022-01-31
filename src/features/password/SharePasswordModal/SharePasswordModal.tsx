import React, { useEffect, useState } from "react";
import Modal, { ModalProps } from "components/Modal";
import { Button, Input } from "components";
import { useMutation } from "react-query";
import { useUser } from "context/UserContext";
import { sharePassword } from "api/password";

type ShowPasswordProps = { passwordId?: number } & Omit<ModalProps, "children">;

const SharePasswordModal = ({ passwordId, ...props }: ShowPasswordProps) => {
  const [sharedId, setSharedId] = useState("0");
  const {
    state: { user },
  } = useUser();

  const {
    mutate: showPasswordMutation,
    data,
    error,
    reset,
  } = useMutation(() =>
    sharePassword({
      passwordId,
      sharedId: parseInt(sharedId),
      userId: user?.id,
    })
  );

  useEffect(() => {
    setSharedId("0");
    reset();
  }, [props.isOpen, reset]);

  return (
    <Modal {...props}>
      <Input
        value={sharedId}
        onChange={setSharedId}
        type="number"
        min={0}
        className="mb-2"
        htmlFor="sharedId"
        label={"Id użytkownika"}
      />
      {data && <p className="mb-2 text-green-500">{data?.message}</p>}
      {error && <p className="mb-2 text-red-500">{(error as any)?.message}</p>}
      <Button disabled={!sharedId} onClick={showPasswordMutation}>
        Udostępnij
      </Button>
    </Modal>
  );
};

export default SharePasswordModal;
