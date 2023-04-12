import { createContext } from "react";
import { userCtx } from "../Types/Users";

const UserCtx = createContext<userCtx>({
  token: "",
  id: "",
  name: "",
  canEdit: false,
  perms: [],
  isAdmin: false,
});

export default UserCtx;
