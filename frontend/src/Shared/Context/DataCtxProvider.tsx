import React, { ReactNode, useReducer } from "react";
import { exampleData, fieldsExample } from "../../fields";
import useTable from "../Hooks/useTable";
import Fields from "../Types/Fields";
import DataCtx from "./DataCtx";

const DataCtxProvider = (props: { children: ReactNode }) => {
  const { reducer, columnsReducer } = useTable();
  const [columns, dispatchColumns] = useReducer(columnsReducer, fieldsExample);
  const [rows, dispatchRows] = useReducer(reducer, exampleData(fieldsExample));

  return (
    <DataCtx.Provider
      value={{
        rows,
        columns,
        rowsDispatcher: dispatchRows,
        columnsDispatcher: dispatchColumns,
      }}
    >
      {props.children}
    </DataCtx.Provider>
  );
};

export default DataCtxProvider;
