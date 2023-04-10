import { TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { TextInputProps } from "../../../Shared/Types/TableInputs";
// i guess typescript doesn't like this library very much ):
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./cssOverrides.module.css";

// the date is coming as a string so no need for extra prop types - we can recycle the text input's prop types
const DateInput = (props: TextInputProps) => {
  const { rowId, rowIndex, columnId, data, changeHandler } = props;

  //   to get to where the data we have to do state[rowIndex][columnId]

  const optimizedChangeFunction = useCallback(
    (date: Date) => {
      changeHandler({
        type: "changeRow",
        rowIndex,
        columnId,
        value: date.toISOString(),
      });
    },
    [rowIndex, columnId]
  );

  //   using mui input i can make a text input
  return (
    <DatePicker
      selected={data ? new Date(data) : new Date()}
      onChange={(date: Date) => {
        optimizedChangeFunction(date);
      }}
      dateFormat="dd/MM/yyyy"
      className={styles.DatePickerElement}
    />
  );
};

export default React.memo(DateInput);
