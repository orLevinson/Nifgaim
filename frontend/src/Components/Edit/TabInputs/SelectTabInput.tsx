import { MenuItem, Select } from "@mui/material";
import React from "react";
import { SelectTabInputProps } from "../../../Shared/Types/TabInputs";

const SelectTabInput = (props: SelectTabInputProps) => {
  const {
    rowId,
    rowIndex,
    columnId,
    subColumnId,
    subRowIndex,
    data,
    options,
    changeHandler,
  } = props;

  //   to get to where the data we have to do state[rowIndex][columnId]

  //   using mui input i can make a text input
  return (
    <Select
      size="medium"
      id="outlined"
      value={data}
      label=""
      variant="outlined"
      onChange={(e) => {
        changeHandler({
          type: "changeTab",
          rowId,
          columnId,
          subRowIndex,
          subColumnId,
          value: e.target.value,
        });
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

export default React.memo(SelectTabInput);
