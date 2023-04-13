import React, { ReactNode, useEffect, useReducer, useState } from "react";
import { globalReducerType } from "../Types/Global";
import GlobalCtx from "./GlobalCtx";

const globalReducer: React.Reducer<string[], globalReducerType> = (
  state,
  action
) => {
  let shallowCopy = [...state];
  switch (action.type) {
    case "addPerm":
      return [...shallowCopy, ""];
      break;
    case "changePerm":
      if (
        action.permIndex !== undefined &&
        shallowCopy[action.permIndex] !== undefined &&
        action.value !== undefined
      ) {
        shallowCopy[action.permIndex] = action.value + "";
      }
      return shallowCopy;
      break;
    case "removePerm":
      if (action.permIndex !== undefined) {
        shallowCopy.splice(action.permIndex, 1);
      }
      return shallowCopy;
      break;
    case "initPerm":
      if (action.state !== undefined) {
        shallowCopy = action.state;
      }
      return shallowCopy;
      break;
    default:
      return shallowCopy;
      break;
  }
};

const GlobalCtxProvider = (props: { children: ReactNode }) => {
  const [values, valuesReducer] = useReducer(globalReducer, []);
  const [init, setInit] = useState(false);

  const fetch: () => string[] = () => {
    return ["פיקוד צפון", "פיקוד דרום", "פיקוד מרכז"];
  };

  useEffect(() => {
    if (init === false) {
      valuesReducer({ type: "initPerm", state: fetch() });
      setInit(true);
    } else {
      console.log("send HTTP req");
    }
  }, [valuesReducer, init, values]);

  return (
    <GlobalCtx.Provider
      value={{ perm: values, changePerms: valuesReducer, permsLoaded: init }}
    >
      {props.children}
    </GlobalCtx.Provider>
  );
};

export default GlobalCtxProvider;
