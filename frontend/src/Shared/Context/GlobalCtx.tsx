import React, { createContext } from "react";
import { globalReducerType } from "../Types/Global";

const GlobalCtx = createContext<{
  perms: string[];
  changePerms: React.Dispatch<globalReducerType>;
  permsLoaded: boolean;
}>({
  perms: [],
  changePerms: (value) => {},
  permsLoaded: false,
});

export default GlobalCtx;
