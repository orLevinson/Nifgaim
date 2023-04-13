import Fields from "../Types/Fields";
import {
  addColumnsType,
  addDataType,
  changeColumnType,
  changeDataType,
  columnsGeneratorType,
  dataType,
  deleteColumnType,
  deleteDataType,
  getColumnsType,
  getDataType,
  reducerActionType,
} from "../Types/Table";
import TextInput from "../../Components/Edit/TableInputs/TextInput";
import TextAreaInput from "../../Components/Edit/TableInputs/TextAreaInput";
import DateInput from "../../Components/Edit/TableInputs/DateInput";
import SelectInput from "../../Components/Edit/TableInputs/SelectInput";
import { Button } from "@mui/material";
import columnsReducer from "../Types/Columns";
import { commands } from "../../fields";
import { useCallback, useContext } from "react";
import GlobalCtx from "../Context/GlobalCtx";
import useHttpRequest from "./useHttpRequest";
import UserCtx from "../Context/UserCtx";
import PermInput from "../../Components/Edit/TableInputs/PermInput";

const useTable = () => {
  const { perm } = useContext(GlobalCtx);
  const { httpRequest } = useHttpRequest();
  const { token, perm: userPerm } = useContext(UserCtx);

  const getColumns: getColumnsType = useCallback(async () => {
    const result = await httpRequest({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/attributes`,
      method: "GET",
      headers: {},
      customErrorMsg: "קרתה שגיאה בעת משיכת הסעיפים",
    });

    const { res } = result;
    return (res ? res.attributes : []) as Fields[];
  }, [httpRequest]);

  const addColumns: addColumnsType = useCallback(
    async (number) => {
      const result = await httpRequest({
        url: `${import.meta.env.VITE_BACKEND_URL}/api/attributes`,
        method: "POST",
        headers: { Authorization: `bearer ${token}` },
        body: { number },
        customErrorMsg: "קרתה שגיאה בעת הוספת הסעיפים",
      });

      const { res } = result;
      return (res ? res.idArr : []) as string[];
    },
    [token, httpRequest]
  );

  const deleteColumn: deleteColumnType = useCallback(
    async (id) => {
      const result = await httpRequest({
        url: `${import.meta.env.VITE_BACKEND_URL}/api/attributes/${id}`,
        method: "DELETE",
        headers: { Authorization: `bearer ${token}` },
        customErrorMsg: "קרתה שגיאה בעת מחיקת הסעיף",
      });

      const { success } = result;
      return { success };
    },
    [token, httpRequest]
  );

  const changeColumn: changeColumnType = useCallback(
    async (id, data) => {
      const result = await httpRequest({
        url: `${import.meta.env.VITE_BACKEND_URL}/api/attributes/${id}`,
        method: "PATCH",
        headers: { Authorization: `bearer ${token}` },
        body: { ...data },
        customErrorMsg: "קרתה שגיאה בעת הוספת הסעיפים",
      });

      const { res } = result;
      return (res && res.attribute ? res.attribute : data) as Fields;
    },
    [token, httpRequest]
  );

  const getData: getDataType = useCallback(async () => {
    const result = await httpRequest({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/rows`,
      method: "GET",
      headers: { Authorization: `bearer ${token}` },
      customErrorMsg: "קרתה שגיאה בעת משיכת הרשומות",
    });

    const { res } = result;
    return (
      res
        ? res.rows.map((row: any) => {
            return { ...row, perm: row.perm.join("~") };
          })
        : []
    ) as dataType[];
  }, [httpRequest, token]);

  const addData: addDataType = useCallback(
    async (number) => {
      const result = await httpRequest({
        url: `${import.meta.env.VITE_BACKEND_URL}/api/rows`,
        method: "POST",
        headers: { Authorization: `bearer ${token}` },
        body: { number, perm: userPerm },
        customErrorMsg: "קרתה שגיאה בעת הוספת הרשומות",
      });

      const { res } = result;
      return (res ? res.idArr : []) as string[];
    },
    [userPerm, token, httpRequest]
  );

  const deleteData: deleteDataType = useCallback(
    async (id) => {
      const result = await httpRequest({
        url: `${import.meta.env.VITE_BACKEND_URL}/api/rows/${id}`,
        method: "DELETE",
        headers: { Authorization: `bearer ${token}` },
        customErrorMsg: "קרתה שגיאה בעת מחיקת הרשומה",
      });

      const { success } = result;
      return { success };
    },
    [token, httpRequest]
  );

  const changeData: changeDataType = useCallback(
    async (id, data) => {
      const result = await httpRequest({
        url: `${import.meta.env.VITE_BACKEND_URL}/api/rows/${id}`,
        method: "PATCH",
        headers: { Authorization: `bearer ${token}` },
        body: { ...data, perm: data.perm.split("~") },
        customErrorMsg: "קרתה שגיאה בעת הוספת הסעיפים",
      });

      const { res } = result;
      return (res && res.row ? res.row : data) as dataType;
    },
    [token, httpRequest]
  );

  const columnsGenerator: columnsGeneratorType = useCallback(
    (fields, changeHandler) => {
      const sizes = {
        big: "300px",
        medium: "220px",
        small: "150px",
      };

      let columns: any = [];
      // options for each field
      // "text" | "multi-row" | "select" | "date" | "multi-attributes"
      columns.push({
        cell: (row: any, index: number, column: any) => (
          <PermInput
            changeHandler={changeHandler}
            rowId={row.id}
            data={row.perm}
            rowData={row}
          />
        ),
        name: "הרשאה",
        sortable: false,
        sortFunction: (rowA: any, rowB: any) => {
          const stringA = rowA.perm ? rowA.perm : "";
          const stringB = rowB.perm ? rowB.perm : "";
          return stringA.localeCompare(stringB);
        },
        width: sizes["medium"],
      });
      fields.forEach((field: Fields) => {
        switch (field.type) {
          case "date":
            columns.push({
              cell: (row: any, index: number, column: any, id: string) => (
                <DateInput
                  changeHandler={changeHandler}
                  rowData={row}
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
                  rowData={row}
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
                  rowData={row}
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
                  rowData={row}
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
    },
    []
  );

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
      case "init":
        return action.initData ? action.initData : [];
        break;
      case "addRow":
        if (action.addRowArr && Array.isArray(action.addRowArr)) {
          action.addRowArr.forEach((item) =>
            shallowCopy.unshift({
              id: item + "",
              _id: item + "",
              perm: userPerm.join("~"),
            })
          );
        }
        return [...shallowCopy];
        break;
      case "removeRow":
        if (rowIndex !== undefined && action.rowId) {
          shallowCopy.splice(rowIndex, 1);
          deleteData(action.rowId);
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
          if (action.isDateElement && action.rowId) {
            changeData(action.rowId, shallowCopy[rowIndex]);
          }
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
          if (action.rowId && rowIndex !== undefined && shallowCopy[rowIndex]) {
            changeData(action.rowId, shallowCopy[rowIndex]);
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
          if (action.rowId && rowIndex !== undefined && shallowCopy[rowIndex]) {
            changeData(action.rowId, shallowCopy[rowIndex]);
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
          if (action.rowId && rowIndex !== undefined && shallowCopy[rowIndex]) {
            changeData(action.rowId, shallowCopy[rowIndex]);
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

  const columnsReducer: React.Reducer<Fields[], columnsReducer> = useCallback(
    (state, action) => {
      let shallowCopy: Fields[] = [...state];
      let colIndex: number = -1;
      let colOptionPointer: string[] | undefined = [];
      let colChildrenPointer:
        | {
            id: string;
            name: string;
            type: "text" | "multi-row" | "select" | "date";
            options?: string[] | undefined;
            width?: "big" | "medium" | "small" | undefined;
          }[]
        | undefined = [];
      let subColOptionPointer: string[] | undefined = [];
      if (action.colId && shallowCopy.length > 0) {
        colIndex = shallowCopy.findIndex((row) => row.id === action.colId);
        if (colIndex === -1) {
          return shallowCopy;
        }
        colOptionPointer = shallowCopy[colIndex].options;
        colChildrenPointer = shallowCopy[colIndex].children;
        if (
          colChildrenPointer &&
          Array.isArray(colChildrenPointer) &&
          action.subColIndex !== undefined &&
          colChildrenPointer[action.subColIndex] !== undefined
        ) {
          subColOptionPointer = colChildrenPointer[action.subColIndex].options;
        }
      }

      switch (action.type) {
        case "init":
          return action.initData ? action.initData : [];
          break;
        case "addCol":
          if (action.addColArr && Array.isArray(action.addColArr)) {
            action.addColArr.forEach((item) =>
              shallowCopy.unshift({
                id: item + "",
                name: "שם",
                type: "text",
                width: "big",
                options: [],
                children: [],
              })
            );
          }
          return [...shallowCopy];
          break;
        case "removeCol":
          shallowCopy.splice(colIndex, 1);
          return shallowCopy;
          break;
        case "changeColTitle":
          shallowCopy[colIndex].name = action.value ? action.value + "" : "";
          return shallowCopy;
          break;
        case "changeColType":
          if (
            action.value === "text" ||
            action.value === "multi-row" ||
            action.value === "select" ||
            action.value === "date" ||
            action.value === "multi-attributes"
          ) {
            shallowCopy[colIndex].type = action.value ? action.value : "text";
          }
          return shallowCopy;
          break;
        case "changeColSize":
          if (
            action.value === "big" ||
            action.value === "medium" ||
            action.value === "small"
          ) {
            shallowCopy[colIndex].width = action.value ? action.value : "big";
          }
          return shallowCopy;
          break;
        case "addColOption":
          shallowCopy[colIndex]["options"] = Array.isArray(colOptionPointer)
            ? [...colOptionPointer, ""]
            : [""];
          return shallowCopy;
          break;
        case "removeColOption":
          if (
            action.colOptionIndex !== undefined &&
            Array.isArray(colOptionPointer)
          ) {
            colOptionPointer.splice(action.colOptionIndex, 1);
          }
          changeColumn(shallowCopy[colIndex].id, shallowCopy[colIndex]);
          return shallowCopy;
          break;
        case "changeColOption":
          if (
            action.colOptionIndex !== undefined &&
            Array.isArray(colOptionPointer) &&
            colOptionPointer[action.colOptionIndex] !== undefined
          ) {
            colOptionPointer[action.colOptionIndex] = action.value
              ? action.value + ""
              : "";
          }
          return shallowCopy;
          break;
        case "addSubCol":
          if (shallowCopy[colIndex].type === "multi-attributes") {
            if (colChildrenPointer && Array.isArray(colChildrenPointer)) {
              colChildrenPointer.push({
                id: new Date().getTime() + "",
                name: "",
                type: "text",
                options: [],
                width: "big",
              });
            } else {
              shallowCopy[colIndex].children = [
                {
                  id: new Date().getTime() + "",
                  name: "",
                  type: "text",
                  options: [],
                  width: "big",
                },
              ];
            }
          }
          return shallowCopy;
          break;
        case "removeSubCol":
          if (shallowCopy[colIndex].type === "multi-attributes") {
            if (
              colChildrenPointer &&
              Array.isArray(colChildrenPointer) &&
              action.subColIndex !== undefined
            ) {
              colChildrenPointer.splice(action.subColIndex, 1);
            }
          }
          changeColumn(shallowCopy[colIndex].id, shallowCopy[colIndex]);
          return shallowCopy;
          break;
        case "changeSubColTitle":
          if (shallowCopy[colIndex].type === "multi-attributes") {
            if (
              colChildrenPointer &&
              Array.isArray(colChildrenPointer) &&
              action.subColIndex !== undefined &&
              colChildrenPointer[action.subColIndex] !== undefined
            ) {
              colChildrenPointer[action.subColIndex].name = action.value
                ? action.value + ""
                : "";
            }
          }
          return shallowCopy;
          break;
        case "changeSubColType":
          if (shallowCopy[colIndex].type === "multi-attributes") {
            if (
              colChildrenPointer &&
              Array.isArray(colChildrenPointer) &&
              action.subColIndex !== undefined &&
              colChildrenPointer[action.subColIndex] !== undefined &&
              (action.value === "text" ||
                action.value === "multi-row" ||
                action.value === "date" ||
                action.value === "select")
            ) {
              colChildrenPointer[action.subColIndex].type = action.value;
            }
          }
          return shallowCopy;
          break;
        case "addSubColOption":
          if (shallowCopy[colIndex].type === "multi-attributes") {
            if (
              subColOptionPointer !== undefined &&
              Array.isArray(subColOptionPointer)
            ) {
              subColOptionPointer.push("");
            } else {
              subColOptionPointer = [""];
            }
          }
          return shallowCopy;
          break;
        case "removeSubColOption":
          if (shallowCopy[colIndex].type === "multi-attributes") {
            if (
              subColOptionPointer !== undefined &&
              Array.isArray(subColOptionPointer) &&
              action.subColOptionIndex !== undefined
            ) {
              subColOptionPointer.splice(action.subColOptionIndex, 1);
            }
          }
          return shallowCopy;
          break;
        case "changeSubColOption":
          if (shallowCopy[colIndex].type === "multi-attributes") {
            if (
              subColOptionPointer !== undefined &&
              Array.isArray(subColOptionPointer) &&
              action.subColOptionIndex !== undefined
            ) {
              subColOptionPointer[action.subColOptionIndex] = action.value
                ? action.value + ""
                : "";
            }
          }
          return shallowCopy;
          break;
        default:
          return shallowCopy;
      }
    },
    [changeColumn]
  );

  return {
    columnsGenerator,
    reducer,
    columnsReducer,
    getColumns,
    addColumns,
    deleteColumn,
    changeColumn,
    getData,
    addData,
    changeData,
    deleteData,
  };
};

export default useTable;
