import { TextField } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { TextTabInputProps } from "../../../Shared/Types/TabInputs";
import styles from "./cssOverrides.module.css";

const DateTabInput = (props: TextTabInputProps) => {
  const { rowId, columnId, subColumnId, subRowIndex, data, changeHandler } =
    props;

  const [temporaryValue, setTemporaryValue] = useState(data ? data : "");

  //   to get to where the data we have to do state[rowIndex][columnId]

  //   using mui input i can make a text input
  return (
    <DatePicker
      selected={temporaryValue ? new Date(temporaryValue) : new Date()}
      onChange={(date: Date) => {
        setTemporaryValue(date.toISOString());
      }}
      onBlur={(e: any) => {
        changeHandler({
          type: "changeTab",
          rowId,
          columnId,
          subRowIndex,
          subColumnId,
          value: e.target.value,
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
