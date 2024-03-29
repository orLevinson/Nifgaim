import { TextField } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { TextTabInputProps } from "../../../Shared/Types/TabInputs";
import styles from "./cssOverrides.module.css";

const DateTabInput = (props: TextTabInputProps) => {
  const { rowId, columnId, subColumnId, subRowIndex, data, changeHandler } =
    props;

  //   to get to where the data we have to do state[rowIndex][columnId]
  function isValidDate(value: string) {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }
  //   using mui input i can make a text input
  return (
    <DatePicker
      selected={data && isValidDate(data) ? new Date(data) : new Date()}
      onChange={(date: Date) => {
        changeHandler({
          type: "changeTab",
          rowId,
          columnId,
          subRowIndex,
          subColumnId,
          value: date.toISOString(),
        });
      }}
      className={styles.DatePickerElement}
      dateFormat="dd/MM/yyyy"
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
    />
  );
};

export default React.memo(DateTabInput);
