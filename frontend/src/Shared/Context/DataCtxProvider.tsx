import React, {
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { exampleData, fieldsExample } from "../../fields";
import useTable from "../Hooks/useTable";
import Fields from "../Types/Fields";
import DataCtx from "./DataCtx";

const DataCtxProvider = (props: { children: ReactNode }) => {
  const { reducer, columnsReducer, getColumns, getData } = useTable();
  const [columns, dispatchColumns] = useReducer(columnsReducer, []);
  const [rows, dispatchRows] = useReducer(reducer, []);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const dataCol = await getColumns();
      dispatchColumns({ type: "init", initData: dataCol });
      const dataRow = await getData();
      dispatchRows({ type: "init", initData: dataRow });
    };
    fetchData();
    setLoadingData(false);
  }, [getColumns, columnsReducer]);

  return (
    <DataCtx.Provider
      value={{
        rows,
        columns,
        rowsDispatcher: dispatchRows,
        columnsDispatcher: dispatchColumns,
        loadingData,
      }}
    >
      {props.children}
    </DataCtx.Provider>
  );
};

export default DataCtxProvider;
