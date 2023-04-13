import React, { useContext, useEffect, useState } from "react";
import UsersTable from "../Components/EditUsers/UsersTable";
import { exampleUsersHandler } from "../fields";
import GlobalCtx from "../Shared/Context/GlobalCtx";
import useUsers from "../Shared/Hooks/useUsers";
import { user } from "../Shared/Types/Users";
import LoadingPage from "../Shared/UIElements/LoadingPage";

const EditUsers = () => {
  const { perm, permsLoaded } = useContext(GlobalCtx);
  const { loaded, setUsers, users, changeUser, deleteUser } = useUsers();

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
        <UsersTable
          users={users}
          perm={perm}
          changeUsers={setUsers}
          changeUserFn={changeUser}
          deleteUserFn={deleteUser}
        />
      </div>
    </div>
  );
};

export default EditUsers;
