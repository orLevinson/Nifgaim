import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import useHttpRequest from "../Hooks/useHttpRequest";
import { globalReducerType } from "../Types/Global";
import GlobalCtx from "./GlobalCtx";
import UserCtx from "./UserCtx";

const GlobalCtxProvider = (props: { children: ReactNode }) => {
  const { token } = useContext(UserCtx);
  const { httpRequest } = useHttpRequest();

  const fetch: () => Promise<string[]> = useCallback(async () => {
    const result = await httpRequest({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/perms`,
      method: "GET",
      headers: {},
      customErrorMsg: "קרתה שגיאה בעת משיכת ההרשאות",
    });

    const { res } = result;
    return (res ? res.perm : []) as string[];
  }, [httpRequest]);

  const post: (valueArr: string[]) => Promise<string[]> = useCallback(
    async (valueArr) => {
      const result = await httpRequest({
        url: `${import.meta.env.VITE_BACKEND_URL}/api/perms`,
        method: "POST",
        headers: { Authorization: `bearer ${token}` },
        body: {
          perm: valueArr,
        },
        customErrorMsg: "קרתה שגיאה בעת פרסום ההרשאות",
      });

      const { res } = result;

      return (res ? res.perm : []) as string[];
    },
    [token, httpRequest]
  );

  const globalReducer: React.Reducer<string[], globalReducerType> = useCallback(
    (state, action) => {
      let shallowCopy: string[] = [...state];
      switch (action.type) {
        case "addPerm":
          post([...shallowCopy, ""]);
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
          post(shallowCopy);
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
    },
    [post]
  );

  const [values, valuesReducer] = useReducer(globalReducer, []);
  const [init, setInit] = useState(false);

  useEffect(() => {
    const initLoad = async () => {
      if (init === false) {
        const fetchedValues = await fetch();
        valuesReducer({
          type: "initPerm",
          state: fetchedValues ? fetchedValues : [],
        });
        setInit(true);
      }
    };
    initLoad();
  }, [valuesReducer, init]);

  return (
    <GlobalCtx.Provider
      value={{
        perm: values,
        changePerms: valuesReducer,
        post,
        permsLoaded: init,
      }}
    >
      {props.children}
    </GlobalCtx.Provider>
  );
};

export default GlobalCtxProvider;
