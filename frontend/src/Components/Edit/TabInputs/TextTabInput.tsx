import { TextField } from "@mui/material";
import React, { useState } from "react";
import { TextTabInputProps } from "../../../Shared/Types/TabInputs";

const TextTabInput = (props: TextTabInputProps) => {
  const { rowId, columnId, subColumnId, subRowIndex, data, changeHandler } =
    props;

  const [temporaryValue, setTemporaryValue] = useState(data ? data : "");

  //   to get to where the data we have to do state[rowIndex][columnId]

  //   using mui input i can make a text input
  return (
    <TextField
      size="medium"
      id="outlined"
      value={temporaryValue}
      label=""
      variant="outlined"
      onChange={(e) => {
        setTemporaryValue(e.target.value);
      }}
      inputProps={{
        onKeyDown: (e) => {
          if (e.key === "Enter") {
            (e.currentTarget as HTMLInputElement).blur(); // blur the input to trigger the onBlur event
          }
        },
        onBlur: (e) => {
          changeHandler({
            type: "changeTab",
            rowId,
            columnId,
            subRowIndex,
            subColumnId,
            value: e.target.value,
          });
        },
      }}
    />
  );
};

export default React.memo(TextTabInput);
