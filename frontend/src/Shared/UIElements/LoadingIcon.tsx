import { Close } from "@mui/icons-material";
import { CircularProgress, Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import LoadingCtx from "../Context/loadingCtx";

const ClearDelay = 7 * 1000; // 7 sec = 7K millisec

const LoadingIcon = () => {
  const { error, statusMsg, isLoading } = useContext(LoadingCtx);
  const [loadState, setLoadState] = useState<"loading" | "error" | "nothing">(
    "nothing"
  );

  useEffect(() => {
    if (error) {
      setLoadState("error");
      setTimeout(() => {
        setLoadState("nothing");
      }, ClearDelay);
    } else if (isLoading) {
      setLoadState("loading");
    } else {
      setLoadState("nothing");
    }
  }, [error, isLoading]);

  switch (loadState) {
    case "loading":
      return (
        <div
          style={{
            position: "fixed",
            left: 10,
            bottom: 10,
            width: 70,
            height: 70,
            padding: "15px!important",
            background: "rgba(225,225,225,0.9)",
            borderRadius: "3px",
          }}
        >
          <CircularProgress />
        </div>
      );
      break;
    case "error":
      return (
        <Tooltip title={statusMsg}>
          <div
            style={{
              position: "absolute",
              left: 10,
              bottom: 10,
              width: 70,
              height: 70,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "15px",
              background: "rgba(225,225,225,0.9)",
              borderRadius: "3px",
            }}
          >
            <Close color="error" sx={{ fontSize: "40px" }} />
          </div>
        </Tooltip>
      );
      break;
    default:
      return <></>;
      break;
  }
};

export default LoadingIcon;
