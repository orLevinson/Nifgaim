import React, { createContext } from "react";
import { globalReducerType } from "../Types/Global";

const GlobalCtx = createContext<{
  perm: string[];
  changePerms: React.Dispatch<globalReducerType>;
  permsLoaded: boolean;
}>({
  perm: [],
  changePerms: (value) => {},
  permsLoaded: false,
});

export default GlobalCtx;
