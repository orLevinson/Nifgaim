import { createContext } from "react";
import { userCtx } from "../Types/Users";

const UserCtx = createContext<userCtx>({
  token: "",
  id: "",
  name: "",
  canEdit: false,
  perm: [],
  isAdmin: false,
  login: async (username, password) => {},
  logout: () => {},
  register: async (username, password, perm, name) => {},
});

export default UserCtx;
