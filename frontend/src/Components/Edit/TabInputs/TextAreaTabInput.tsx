import { TextField } from "@mui/material";
import React, { useState } from "react";
import { TextTabInputProps } from "../../../Shared/Types/TabInputs";

const TextAreaTabInput = (props: TextTabInputProps) => {
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
      multiline
      variant="outlined"
      onChange={(e) => {
        setTemporaryValue(e.target.value);
      }}
      inputProps={{
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

export default React.memo(TextAreaTabInput);
