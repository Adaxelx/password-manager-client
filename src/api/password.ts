import { client } from "./client";

type Props = {
  userId?: number;
};

type DecryptProps = { passwordId?: number; key: string } & Props;

type ShareProps = { passwordId?: number; sharedId: number } & Props;

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
