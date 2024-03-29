import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import useTable from "../../../Shared/Hooks/useTable";
import { SelectInputProps } from "../../../Shared/Types/TableInputs";

const SelectInput = (props: SelectInputProps) => {
  const {
    rowId,
    rowData,
    rowIndex,
    columnId,
    data,
    options = [],
    changeHandler,
  } = props;
  //   to get to where the data we have to do state[rowIndex][columnId]
  const { changeData } = useTable();

  const optimizedChangeFunction = useCallback(
    (e: SelectChangeEvent<string>) => {
      changeHandler({
        type: "changeRow",
        rowId,
        columnId,
        value: e.target.value,
      });
    },
    [rowId, columnId]
  );

  //   using mui select i can make a select input
  return (
    <Select
      size="small"
      id="outlined"
      value={data ? data : ""}
      sx={{
        "& .MuiInputBase-input": { padding: 1, cursor: "pointer" },
        "& .MuiInputBase-input:focus": { cursor: "text" },
        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "solid 1px black",
        },
      }}
      label=""
      multiline
      variant="outlined"
      onBlur={() => {
        changeData(rowId, rowData);
      }}
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
