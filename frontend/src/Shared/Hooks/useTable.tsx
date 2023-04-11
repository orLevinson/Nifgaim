import Fields from "../Types/Fields";
import {
  columnsGeneratorType,
  dataType,
  reducerActionType,
} from "../Types/Table";
import TextInput from "../../Components/Edit/TableInputs/TextInput";
import TextAreaInput from "../../Components/Edit/TableInputs/TextAreaInput";
import DateInput from "../../Components/Edit/TableInputs/DateInput";
import SelectInput from "../../Components/Edit/TableInputs/SelectInput";
import { Button } from "@mui/material";

const useTable = () => {
  const columnsGenerator: columnsGeneratorType = (fields, changeHandler) => {
    const sizes = {
      big: "300px",
      medium: "220px",
      small: "150px",
    };

    let columns: any = [];
    // options for each field
    // "text" | "multi-row" | "select" | "date" | "multi-attributes"
    fields.forEach((field: Fields) => {
      switch (field.type) {
        case "date":
          columns.push({
            cell: (row: any, index: number, column: any, id: string) => (
              <DateInput
                changeHandler={changeHandler}
                rowId={row.id}
                rowIndex={index}
                columnId={field.id}
                data={row[field.id]}
              />
            ),
            name: field.name,
            sortable: true,
            sortFunction: (rowA: any, rowB: any) => {
              const dateA = rowA[field.id]
                ? new Date(rowA[field.id])
                : new Date();
              const dateB = rowB[field.id]
                ? new Date(rowB[field.id])
                : new Date();

              if (dateA.getTime() > dateB.getTime()) {
                return 1;
              }
              if (dateA.getTime() < dateB.getTime()) {
                return -1;
              }
              return 0;
            },
            width: sizes[field.width ? field.width : "big"],
          });
          break;
        case "multi-attributes":
          columns.push({
            cell: (row: any) =>
              Array.isArray(row[field.id]) ? row[field.id].length : "לא הוזן",
            name: field.name,
            sortable: true,
            sortFunction: (rowA: any, rowB: any) => {
              const ArrA = Array.isArray(rowA[field.id])
                ? rowA[field.id].length
                : -1;
              const ArrB = Array.isArray(rowB[field.id])
                ? rowB[field.id].length
                : -1;
              if (ArrA > ArrB) {
                return 1;
              }
              if (ArrA < ArrB) {
                return -1;
              }
              return 0;
            },
            width: sizes[field.width ? field.width : "big"],
          });
          break;
        case "select":
          columns.push({
            cell: (row: any, index: number, column: any) => (
              <SelectInput
                changeHandler={changeHandler}
                rowId={row.id}
                rowIndex={index}
                columnId={field.id}
                data={row[field.id]}
                options={field.options ? field.options : []}
              />
            ),
            name: field.name,
            sortable: true,
            sortFunction: (rowA: any, rowB: any) => {
              const stringA = rowA[field.id] ? rowA[field.id] : "";
              const stringB = rowB[field.id] ? rowB[field.id] : "";
              return stringA.localeCompare(stringB);
            },
            width: sizes[field.width ? field.width : "big"],
          });
          break;
        case "multi-row":
          columns.push({
            cell: (row: any, index: number, column: any) => (
              <TextAreaInput
                changeHandler={changeHandler}
                rowId={row.id}
                rowIndex={index}
                columnId={field.id}
                data={row[field.id]}
              />
            ),
            name: field.name,
            sortable: true,
            sortFunction: (rowA: any, rowB: any) => {
              const stringA = rowA[field.id] ? rowA[field.id] : "";
              const stringB = rowB[field.id] ? rowB[field.id] : "";
              return stringA.localeCompare(stringB);
            },
            width: sizes[field.width ? field.width : "big"],
          });
          break;
        default:
          columns.push({
            cell: (row: any, index: number, column: any) => (
              <TextInput
                changeHandler={changeHandler}
                rowId={row.id}
                rowIndex={index}
                columnId={field.id}
                data={row[field.id]}
              />
            ),
            name: field.name,
            sortable: true,
            sortFunction: (rowA: any, rowB: any) => {
              const stringA = rowA[field.id] ? rowA[field.id] : "";
              const stringB = rowB[field.id] ? rowB[field.id] : "";
              return stringA.localeCompare(stringB);
            },
            width: sizes[field.width ? field.width : "big"],
          });
          break;
      }
    });
    columns.push({
      cell: (row: any, index: number, column: any) => (
        <Button
          onClick={() => {
            changeHandler({ type: "removeRow", rowId: row.id });
          }}
          color={"error"}
          variant={"contained"}
        >
          מחק
        </Button>
      ),
      name: "מחק שורה",
      sortable: false,
      width: "auto",
    });

    return columns;
  };

  const reducer: React.Reducer<dataType[], reducerActionType> = (
    state,
    action
  ) => {
    let shallowCopy = [...state];
    let rowIndex: number = -1;
    if (action.rowId) {
      rowIndex = shallowCopy.findIndex((row) => row.id === action.rowId);
      if (rowIndex === -1) {
        return shallowCopy;
      }
    }

    switch (action.type) {
      case "addRow":
        const uuid = new Date().getTime();
        return [...shallowCopy, { id: "" + uuid }];
        break;
      case "removeRow":
        if (rowIndex !== undefined) {
          shallowCopy.splice(rowIndex, 1);
        }
        return shallowCopy;
        break;
      case "changeRow":
        if (
          rowIndex !== undefined &&
          shallowCopy[rowIndex] &&
          action.columnId
        ) {
          shallowCopy[rowIndex][action.columnId] = action.value
            ? action.value
            : "";
        }
        return shallowCopy;
        break;
      case "addTab":
        if (
          rowIndex !== undefined &&
          shallowCopy[rowIndex] &&
          action.columnId
        ) {
          const currentValue = shallowCopy[rowIndex][action.columnId];
          if (!Array.isArray(currentValue)) {
            shallowCopy[rowIndex][action.columnId] = [{}];
          } else {
            shallowCopy[rowIndex][action.columnId] = [...currentValue, {}];
          }
          return shallowCopy;
        }
        break;
      case "removeTab":
        if (
          rowIndex !== undefined &&
          shallowCopy[rowIndex] &&
          action.columnId &&
          action.subRowIndex !== undefined
        ) {
          const currentValue = shallowCopy[rowIndex][action.columnId];
          if (Array.isArray(currentValue)) {
            currentValue.splice(action.subRowIndex, 1);
          }
          return shallowCopy;
        }
        break;
      default:
        if (
          rowIndex !== undefined &&
          shallowCopy[rowIndex] &&
          action.columnId &&
          action.subRowIndex !== undefined &&
          action.subColumnId &&
          Array.isArray(shallowCopy[rowIndex][action.columnId])
        ) {
          const currentValue = shallowCopy[rowIndex][action.columnId];
          if (Array.isArray(currentValue) && currentValue[action.subRowIndex]) {
            currentValue[action.subRowIndex][action.subColumnId] = action.value
              ? action.value
              : "";
          }
          return shallowCopy;
        }
        break;
    }
    // action = remove row / add row / change value in table / remove in expanded tab / add in expanded tab/ change value in expanded tab
    // "addRow" - "removeRow"(rowIndex) - "changeRow"(rowIndex,columnId,value) -
    //  "removeTab"(rowIndex,columnId,subRowIndex) - "addTab"(rowIndex,columnId) -
    //  "changeTab"(rowIndex,columnId,subRowIndex,subColumnId,value)
    return state;
  };

  return { columnsGenerator, reducer };
};

export default useTable;
