import React, { ReactNode, useCallback, useState } from "react";
import LoadingCtx from "./loadingCtx";

const LoadingCtxProvider = (props: { children: ReactNode }) => {
  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    error: false,
    statusMsg: "",
  });

  const clearError = useCallback(() => {
    setLoadingState({
      isLoading: false,
      error: false,
      statusMsg: "",
    });
  }, [setLoadingState]);

  const setLoading = useCallback(
    (isLoading: boolean, error: boolean, statusMsg?: string) => {
      setLoadingState({
        isLoading,
        error,
        statusMsg: statusMsg ? statusMsg : "",
      });
    },
    [setLoadingState]
  );

  return (
    <LoadingCtx.Provider
      value={{
        isLoading: loadingState.isLoading,
        error: loadingState.error,
        statusMsg: loadingState.statusMsg,
        clearError,
        setLoading,
      }}
    >
      {props.children}
    </LoadingCtx.Provider>
  );
};

export default LoadingCtxProvider;
