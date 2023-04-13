import React, { createContext } from "react";
import { globalReducerType } from "../Types/Global";

const GlobalCtx = createContext<{
  perm: string[];
  changePerms: React.Dispatch<globalReducerType>;
  permsLoaded: boolean;
  post: (valueArr: string[]) => Promise<string[]>;
}>({
  perm: [],
  changePerms: (value) => {},
  permsLoaded: false,
  post: async (valueArr) => {
    return [];
  },
});

export default GlobalCtx;
