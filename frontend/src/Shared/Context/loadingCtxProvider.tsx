import React, { ReactNode, useState } from "react";
import LoadingCtx from "./loadingCtx";

const LoadingCtxProvider = (props: { children: ReactNode }) => {
  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    error: false,
    statusMsg: "",
  });

  const clearError = () => {
    setLoadingState({
      isLoading: false,
      error: false,
      statusMsg: "",
    });
  };

  const setLoading = (
    isLoading: boolean,
    error: boolean,
    statusMsg?: string
  ) => {
    setLoadingState({
      isLoading,
      error,
      statusMsg: statusMsg ? statusMsg : "",
    });
  };

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
