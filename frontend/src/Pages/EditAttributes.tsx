import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import Card from "../Components/EditAttributes/Card";
import DataCtx from "../Shared/Context/DataCtx";
import useTable from "../Shared/Hooks/useTable";
import LoadingPage from "../Shared/UIElements/LoadingPage";

const EditAttributes = () => {
  const { addColumns } = useTable();
  const { columns, columnsDispatcher, loadingData } = useContext(DataCtx);
  const [columnsCounter, setColumnsCounter] = useState(1);

  if (loadingData) {
    return (
      <div
        style={{
          width: "90%",
          height: "500px",
          margin: "auto",
          marginTop: 30,
          marginBottom: 30,
        }}
      >
        <LoadingPage />
      </div>
    );
  }

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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TextField
            type={"number"}
            label={"מספר עמודות להוספה"}
            value={columnsCounter}
            onChange={(e) => {
              setColumnsCounter(Math.floor(parseInt(e.target.value)));
            }}
          ></TextField>
          <Button
            onClick={async () => {
              const arr = await addColumns(columnsCounter);
              columnsDispatcher({ type: "addCol", addColArr: arr });
            }}
            variant={"contained"}
            color={"success"}
            sx={{py: "16.5px"}}
          >
            + הוסף עמודות
          </Button>
        </div>
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
