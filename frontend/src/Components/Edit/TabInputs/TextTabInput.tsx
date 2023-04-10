import { TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { TextTabInputProps } from "../../../Shared/Types/TabInputs";
import { TextInputProps } from "../../../Shared/Types/TableInputs";

const TextTabInput = (props: TextTabInputProps) => {
  const {
    rowId,
    rowIndex,
    columnId,
    subColumnId,
    subRowIndex,
    data,
    changeHandler,
  } = props;
  //   to get to where the data we have to do state[rowIndex][columnId]

  useEffect(()=>{
    console.log("remounted text");
  },[]);

  const optimizedChangeFunction = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      changeHandler({
        type: "changeTab",
        rowIndex,
        columnId,
        subRowIndex,
        subColumnId,
        value: e.target.value,
      });
    },
    [rowIndex, columnId, subRowIndex, subColumnId]
  );

  //   using mui input i can make a text input
  return (
    <TextField
      size="medium"
      id="outlined"
      value={data ? data : ""}
      label=""
      variant="outlined"
      onChange={(e) => {
        optimizedChangeFunction(e);
      }}
    />
  );
};

export default React.memo(TextTabInput);
