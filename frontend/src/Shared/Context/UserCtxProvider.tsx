import React, { ReactNode, useState } from "react";
import UserCtx from "./UserCtx";

const UserCtxProvider = (props: { children: ReactNode }) => {
  const [values, setValues] = useState({
    token: "",
    id: "",
    name: "",
    canEdit: true,
    canView: false,
    perms: [],
    isAdmin: true,
  });

  return <UserCtx.Provider value={values}>{props.children}</UserCtx.Provider>;
};

export default UserCtxProvider;
