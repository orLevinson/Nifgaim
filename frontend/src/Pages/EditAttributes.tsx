import { Button } from "@mui/material";
import React, { useContext } from "react";
import Card from "../Components/EditAttributes/Card";
import DataCtx from "../Shared/Context/DataCtx";

const EditAttributes = () => {
  const { columns, columnsDispatcher } = useContext(DataCtx);
  return (
    <div
      style={{ width: "90%", margin: "auto", marginTop: 30, marginBottom: 30 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>עריכת סעיפים</h1>
        <Button
          onClick={() => {
            columnsDispatcher({ type: "addCol" });
          }}
          variant={"contained"}
          color={"success"}
        >
          הוסף עמודה
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {columns.map((col, colIndex) => {
          return (
            <Card
              key={colIndex}
              col={col}
              columnsDispatcher={columnsDispatcher}
              colIndex={colIndex}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EditAttributes;
