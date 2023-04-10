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

const useTable = () => {
  const columnsGenerator: columnsGeneratorType = (fields, changeHandler) => {
    let columns: any = [];
    // options for each field
    // "text" | "multi-row" | "select" | "date" | "multi-attributes"
    fields.forEach((field: Fields) => {
      switch (field.type) {
        case "date":
          columns.push({
            cell: (row: any, index: number, column: any) => (
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
            width: "auto",
          });
          break;
        case "multi-attributes":
          columns.push({
            cell: (row: any) =>
              Array.isArray(row[field.id]) ? row[field.id].length : "לא הוזן",
            name: field.name,
            sortable: true,
            width: "auto",
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
            width: "auto",
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
            width: "auto",
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
            width: "auto",
          });
          break;
      }
    });
    return columns;
  };

  const reducer: React.Reducer<dataType[], reducerActionType> = (
    state,
    action
  ) => {
    let shallowCopy = [...state];
    switch (action.type) {
      case "addRow":
        return [...shallowCopy, {}];
        break;
      case "removeRow":
        if (action.rowIndex !== undefined) {
          shallowCopy.splice(action.rowIndex, 1);
        }
        return shallowCopy;
        break;
      case "changeRow":
        if (
          action.rowIndex !== undefined &&
          shallowCopy[action.rowIndex] &&
          action.columnId
        ) {
          shallowCopy[action.rowIndex][action.columnId] = action.value
            ? action.value
            : "";
        }
        return shallowCopy;
        break;
      case "addTab":
        if (
          action.rowIndex !== undefined &&
          shallowCopy[action.rowIndex] &&
          action.columnId
        ) {
          const currentValue = shallowCopy[action.rowIndex][action.columnId];
          if (!Array.isArray(currentValue)) {
            shallowCopy[action.rowIndex][action.columnId] = [{}];
          } else {
            shallowCopy[action.rowIndex][action.columnId] = [
              ...currentValue,
              {},
            ];
          }
          return shallowCopy;
        }
        break;
      case "removeTab":
        if (
          action.rowIndex !== undefined &&
          shallowCopy[action.rowIndex] &&
          action.columnId &&
          action.subRowIndex
        ) {
          const currentValue = shallowCopy[action.rowIndex][action.columnId];
          if (Array.isArray(currentValue)) {
            currentValue.splice(action.subRowIndex, 1);
          }
          return shallowCopy;
        }
        break;
      default:
        if (
          action.rowIndex !== undefined &&
          shallowCopy[action.rowIndex] &&
          action.columnId &&
          action.subRowIndex &&
          action.subColumnId &&
          Array.isArray(shallowCopy[action.rowIndex][action.columnId])
        ) {
          const currentValue = shallowCopy[action.rowIndex][action.columnId];
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
