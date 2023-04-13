import { TextField } from "@mui/material";
import React, { useCallback } from "react";
import useTable from "../../../Shared/Hooks/useTable";
import { TextInputProps } from "../../../Shared/Types/TableInputs";

const TextInput = (props: TextInputProps) => {
  const { rowId, rowIndex, columnId, data, rowData, changeHandler } = props;
  //   to get to where the data we have to do state[rowIndex][columnId]
  const { changeData } = useTable();

  const optimizedChangeFunction = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      changeHandler({
        type: "changeRow",
        rowId,
        columnId,
        value: e.target.value,
      });
    },
    [rowId, columnId]
  );

  //   using mui input i can make a text input
  return (
    <TextField
      size="small"
      id="outlined"
      value={data ? data : ""}
      sx={{
        "& .MuiInputBase-input": { padding: 1, cursor: "pointer" },
        "& .MuiInputBase-input:focus": { cursor: "text" },
        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "solid 1px black!important",
        },
      }}
      label=""
      variant="outlined"
      inputProps={{
        onBlur: () => {
          changeData(rowId, rowData);
        },
      }}
      onChange={(e) => {
        optimizedChangeFunction(e);
      }}
    />
  );
};

export default React.memo(TextInput);
