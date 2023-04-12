import { CircularProgress } from "@mui/material";
import React from "react";

const LoadingPage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
        <CircularProgress />
        <h1>בטעינה</h1>
    </div>
  );
};

export default LoadingPage;
