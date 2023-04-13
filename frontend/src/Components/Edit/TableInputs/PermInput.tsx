import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useCallback, useContext } from "react";
import GlobalCtx from "../../../Shared/Context/GlobalCtx";
import useTable from "../../../Shared/Hooks/useTable";
import { PermInputProps } from "../../../Shared/Types/TableInputs";

const PermInput = (props: PermInputProps) => {
  const { rowId, data, rowData, changeHandler } = props;
  const { perm } = useContext(GlobalCtx);
  //   to get to where the data we have to do state[rowIndex][columnId]
  const { changeData } = useTable();

  const optimizedChangeFunction = useCallback(
    (e: SelectChangeEvent<string | string[]>) => {
      changeHandler({
        type: "changeRow",
        rowId,
        columnId: "perm",
        value: Array.isArray(e.target.value)
          ? e.target.value.join("~")
          : e.target.value,
      });
    },
    [rowId]
  );

  //   using mui select i can make a select input
  return (
    <Select
      size="small"
      id="outlined"
      value={data ? data.split("~") : [""]}
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
      multiple
      variant="outlined"
      onBlur={() => {
        changeData(rowId, rowData);
      }}
      onChange={(e) => {
        optimizedChangeFunction(e);
      }}
    >
      {perm.map((option, index) => {
        return (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default React.memo(PermInput);
