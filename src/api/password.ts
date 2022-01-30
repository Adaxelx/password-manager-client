import { client } from "./client";

type Props = {
  userId?: number;
};

type DecryptProps = { key: string } & WithPassId;

type WithPassId = { passwordId?: number } & Props;

type ShareProps = { sharedId: number } & WithPassId;

export type Password = {
  id: number;
  password: string;
  name: string;
  creatorId: number;
};

export const getPasswords = ({ userId }: Props) => {
  return client(`user/${userId}/password`);
};

export const showPassword = ({ userId, passwordId, key }: DecryptProps) => {
  return client(`user/${userId}/password/${passwordId}/decrypt`, {
    body: { key },
  });
};

export const sharePassword = ({ userId, passwordId, sharedId }: ShareProps) => {
  return client(`user/${userId}/password/${passwordId}/share`, {
    body: { userId: sharedId },
    method: "PUT",
  });
};

export const deletePassword = ({ userId, passwordId }: WithPassId) => {
  return client(`user/${userId}/password/${passwordId}`, {
    method: "DELETE",
  });
};

type AddPasswordProp = {
  name: string;
  password: string;
  key: string;
} & Props;

export const addPassword = ({ userId, ...body }: AddPasswordProp) => {
  return client(`user/${userId}/password`, {
    body,
  });
};
