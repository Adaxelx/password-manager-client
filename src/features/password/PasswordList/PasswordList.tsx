import { useUser } from "context/UserContext";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Password, getPasswords } from "api/password";
import { Button } from "components";
import ShowPasswordModal from "../ShowPasswordModal";

const PasswordList = () => {
  const {
    state: { user },
    dispatch,
  } = useUser();
  const [passwordId, setPasswordId] = useState<number | undefined>(undefined);

  if (!user) {
    dispatch({ type: "logout" });
  }

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
        <h1 className="text-4xl mb-3">Lista haseł</h1>
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
                    <Button className="mx-2">Udostępnij</Button>
                    <Button className="bg-red-500">Usuń</Button>
                  </>
                )}
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
      </div>
    </div>
  );
};

export default PasswordList;
