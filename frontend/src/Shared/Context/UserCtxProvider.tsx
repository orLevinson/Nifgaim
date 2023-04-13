import React, { ReactNode, useState } from "react";
import UserCtx from "./UserCtx";

const UserCtxProvider = (props: { children: ReactNode }) => {
  const [values, setValues] = useState({
    token: "",
    id: "",
    name: "",
    canEdit: false,
    perms: [],
    isAdmin: false,
  });

  return <UserCtx.Provider value={values}>{props.children}</UserCtx.Provider>;
};

export default UserCtxProvider;
