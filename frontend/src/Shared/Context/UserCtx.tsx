import { createContext } from "react";

const UserCtx = createContext({
  token: "",
  id: "",
  name: "",
  canEdit: false,
  canView: false,
  perms: [],
  isAdmin: false,
});

export default UserCtx;
