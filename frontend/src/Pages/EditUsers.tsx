import React, { useContext, useEffect, useState } from "react";
import UsersTable from "../Components/EditUsers/UsersTable";
import { exampleUsersHandler } from "../fields";
import GlobalCtx from "../Shared/Context/GlobalCtx";
import { user } from "../Shared/Types/Users";
import LoadingPage from "../Shared/UIElements/LoadingPage";

const EditUsers = () => {
  const { perms, permsLoaded } = useContext(GlobalCtx);
  const [users, setUsers] = useState<user[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setUsers(exampleUsersHandler());
    setLoaded(true);
  }, [setUsers, setLoaded]);

  if (!permsLoaded || !loaded) {
    return (
      <div
        style={{
          width: "90%",
          height: "500px",
          margin: "auto",
          marginTop: 30,
          marginBottom: 30,
        }}
      >
        <LoadingPage />
      </div>
    );
  }

  return (
    <div
      style={{ width: "90%", margin: "auto", marginTop: 30, marginBottom: 30 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1>עריכת משתמשים</h1>
        <UsersTable users={users} perms={perms} changeUsers={setUsers} />
      </div>
    </div>
  );
};

export default EditUsers;
