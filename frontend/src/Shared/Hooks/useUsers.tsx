import { useCallback, useContext, useEffect, useState } from "react";
import UserCtx from "../Context/UserCtx";
import { user } from "../Types/Users";
import useHttpRequest from "./useHttpRequest";

const useUsers = () => {
  const [users, setUsers] = useState<user[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { httpRequest } = useHttpRequest();
  const { token } = useContext(UserCtx);

  const fetchUsers: () => Promise<user[]> = useCallback(async () => {
    const result = await httpRequest({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/users`,
      method: "GET",
      headers: { Authorization: `bearer ${token}` },
      customErrorMsg: "קרתה שגיאה בעת משיכת המשתמשים",
    });

    const { res } = result;
    return (res ? res.users : []) as user[];
  }, [httpRequest]);

  const changeUser: (id: string, data: user) => Promise<user> = useCallback(
    async (id, data) => {
      const result = await httpRequest({
        url: `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`,
        method: "PATCH",
        headers: { Authorization: `bearer ${token}` },
        body: {
          name: data.name,
          perm: data.perm,
          isAdmin: data.isAdmin,
          canEdit: data.canEdit,
        },
        customErrorMsg: "קרתה שגיאה בעת שינוי משתמש",
      });

      const { res } = result;
      return (res ? res.users : []) as user;
    },
    [httpRequest, token]
  );

  const deleteUser: (id: string) => Promise<{ success: boolean }> = useCallback(
    async (id) => {
      const result = await httpRequest({
        url: `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`,
        method: "DELETE",
        headers: { Authorization: `bearer ${token}` },
        customErrorMsg: "קרתה שגיאה בעת מחיקת משתמש",
      });

      const { success } = result;
      return { success };
    },
    [httpRequest, token]
  );

  useEffect(() => {
    const initUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
      setLoaded(true);
    };
    initUsers();
  }, [fetchUsers]);

  return { users, setUsers, loaded, deleteUser, changeUser };
};

export default useUsers;
