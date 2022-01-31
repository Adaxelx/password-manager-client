import { useUser } from "context/UserContext";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Password, getPasswords, deletePassword } from "api/password";
import { Button } from "components";
import ShowPasswordModal from "../ShowPasswordModal";
import SharePasswordModal from "../SharePasswordModal";
import AddPasswordModal from "../AddPasswordModal";
import ChangePasswordModal from "../ChangePasswordModal";
const PasswordList = () => {
  const {
    state: { user },
    dispatch,
  } = useUser();
  const [passwordId, setPasswordId] = useState<number | undefined>(undefined);
  const [passwordShareId, setPasswordShareId] = useState<number | undefined>(
    undefined
  );
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isAddPasswordOpen, setIsAddPasswordOpen] = useState(false);
  if (!user) {
    dispatch({ type: "logout" });
  }

  const { mutate: deleteMutation } = useMutation(
    (passwordId: number) => deletePassword({ passwordId, userId: user?.id }),
    {
      onSuccess: () => {
        queryInfo.refetch();
      },
    }
  );

  const queryInfo = useQuery<Password[]>(["passwordList", user?.id], () =>
    getPasswords({ userId: user?.id })
  );

  if (queryInfo.isLoading || queryInfo.isIdle) {
    return <p>Ładowanie...</p>;
  } else if (queryInfo.isError) {
    return <p>Coś poszło nie tak</p>;
  }

  return (
    <div className="w-full min-h-screen p-3">
      <div className="flex flex-col">
        <h1 className="text-4xl mb-3">{`Lista haseł użytkownika o id: ${user?.id}`}</h1>
        {user?.restorationKey && (
          <>
            <h3 className="text-2xl mb-3">{`Klucz do przywrócenia hasła (ZAPISZ GO BO WIDZISZ GO JEDNORAZOWO!):`}</h3>
            <h2 className="text-3xl text-red-600 mb-3">
              {user.restorationKey}
            </h2>
          </>
        )}
        <div className="mb-3">
          <Button className="mr-3" onClick={() => setIsAddPasswordOpen(true)}>
            Dodaj hasło
          </Button>
          <Button
            className="mr-3"
            onClick={() => setIsChangePasswordOpen(true)}
          >
            Zmień hasło
          </Button>
          <Button
            className="bg-yellow-500"
            onClick={() => dispatch({ type: "logout" })}
          >
            Wyloguj się
          </Button>
        </div>
        <table>
          <tr>
            <th className="border p-2">Nazwa serwisu</th>
            <th className="border p-2">Dostępne akcje</th>
          </tr>
          {queryInfo.data.map(({ name, creatorId, id }) => (
            <tr>
              <td className="border p-2">{name}</td>
              <td className="border p-2">
                <Button onClick={() => setPasswordId(id)}>Pokaz hasło</Button>
                {user?.id === creatorId && (
                  <>
                    <Button
                      className="ml-2"
                      onClick={() => setPasswordShareId(id)}
                    >
                      Udostępnij
                    </Button>
                  </>
                )}
                <Button
                  className="bg-red-500 ml-2"
                  onClick={() => deleteMutation(id)}
                >
                  Usuń
                </Button>
              </td>
            </tr>
          ))}
        </table>
        {/* <ul className="">
          {queryInfo.data.map(({ name }) => (
            <li>
              {name}
              <Button>Pokaz</Button>
              <Button>Udostępnij</Button>
              <Button className="bg-red-500">Usuń</Button>
            </li>
          ))}
        </ul> */}
        <ShowPasswordModal
          passwordId={passwordId}
          isOpen={Boolean(passwordId)}
          onClose={() => setPasswordId(undefined)}
        />
        <SharePasswordModal
          passwordId={passwordShareId}
          isOpen={Boolean(passwordShareId)}
          onClose={() => setPasswordShareId(undefined)}
        />
        <AddPasswordModal
          isOpen={isAddPasswordOpen}
          onClose={() => setIsAddPasswordOpen(false)}
        />
        <ChangePasswordModal
          isOpen={isChangePasswordOpen}
          onClose={() => setIsChangePasswordOpen(false)}
        />
      </div>
    </div>
  );
};

export default PasswordList;
