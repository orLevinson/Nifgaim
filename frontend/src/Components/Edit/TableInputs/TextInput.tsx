import { TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { TextInputProps } from "../../../Shared/Types/TableInputs";

const TextInput = (props: TextInputProps) => {
  const { rowId, rowIndex, columnId, data, changeHandler } = props;
  //   to get to where the data we have to do state[rowIndex][columnId]

  const optimizedChangeFunction = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      changeHandler({
        type: "changeRow",
        rowId,
        columnId,
        value: e.target.value,
      });
    },
    [rowIndex, columnId]
  );

  //   using mui input i can make a text input
  return (
    <TextField
      size="small"
      id="outlined"
      value={data ? data : ""}
      sx={{
        "& .MuiInputBase-input": { padding: 0, cursor: "pointer" },
        "& .MuiInputBase-input:focus": { cursor: "text" },
        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
        "& .MuiOutlinedInput-notchedOutline:focus": {
          border: "solid 1px black",
        },
      }}
      label=""
      variant="outlined"
      onChange={(e) => {
        optimizedChangeFunction(e);
      }}
    />
  );
};

export default React.memo(TextInput);
