import { TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { TextInputProps } from "../../../Shared/Types/TableInputs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./cssOverrides.module.css";
import useTable from "../../../Shared/Hooks/useTable";

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
        isDateElement: true,
      });
    },
    [rowId, columnId]
  );

  function isValidDate(value: string) {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  //   using react-datePicker i can make a date input
  return (
    <DatePicker
      selected={data && isValidDate(data) ? new Date(data) : new Date()}
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
