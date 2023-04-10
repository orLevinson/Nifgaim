import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { SelectInputProps } from "../../../Shared/Types/TableInputs";

const SelectInput = (props: SelectInputProps) => {
  const {
    rowId,
    rowIndex,
    columnId,
    data,
    options = [],
    changeHandler,
  } = props;
  //   to get to where the data we have to do state[rowIndex][columnId]

  const optimizedChangeFunction = useCallback(
    (e: SelectChangeEvent<string>) => {
      changeHandler({
        type: "changeRow",
        rowIndex,
        columnId,
        value: e.target.value,
      });
    },
    [rowIndex, columnId]
  );

  //   using mui input i can make a text input
  return (
    <Select
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
      multiline
      variant="outlined"
      onChange={(e) => {
        optimizedChangeFunction(e);
      }}
    >
      {options.map((option, index) => {
        return (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default React.memo(SelectInput);
