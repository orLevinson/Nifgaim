import { TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { TextInputProps } from "../../../Shared/Types/TableInputs";
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
        rowId,
        columnId,
        value: date.toISOString(),
      });
    },
    [rowIndex, columnId]
  );

  //   using react-datePicker i can make a date input
  return (
    <DatePicker
      selected={data ? new Date(data) : new Date()}
      onChange={(date: Date) => {
        optimizedChangeFunction(date);
      }}
      dateFormat="dd/MM/yyyy"
      className={styles.DatePickerElement}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      withPortal
    />
  );
};

export default React.memo(DateInput);
