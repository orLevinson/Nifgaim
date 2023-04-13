import { createContext } from "react";

const LoadingCtx = createContext<{
  isLoading: boolean;
  error: boolean;
  statusMsg: string;
  clearError: () => void;
  setLoading: (isLoading: boolean, error: boolean, statusMsg?: string) => void;
}>({
  isLoading: false,
  error: false,
  statusMsg: "",
  clearError: () => {},
  setLoading: (isLoading, error, statusMsg) => {},
});

export default LoadingCtx;
