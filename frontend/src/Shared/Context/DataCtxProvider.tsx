import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { exampleData, fieldsExample } from "../../fields";
import useTable from "../Hooks/useTable";
import Fields from "../Types/Fields";
import DataCtx from "./DataCtx";
import UserCtx from "./UserCtx";

const DataCtxProvider = (props: { children: ReactNode }) => {
  const { reducer, columnsReducer, getColumns, getData } = useTable();
  const [columns, dispatchColumns] = useReducer(columnsReducer, []);
  const [rows, dispatchRows] = useReducer(reducer, []);
  const [loadingData, setLoadingData] = useState(true);
  const { token, canEdit, isAdmin } = useContext(UserCtx);

  useEffect(() => {
    const fetchData = async () => {
      const dataCol = await getColumns();
      dispatchColumns({ type: "init", initData: dataCol });
      const dataRow = await getData();
      dispatchRows({ type: "init", initData: dataRow });
    };
    if (token && token !== "" && (canEdit || isAdmin)) {
      fetchData();
      setLoadingData(false);
    }
  }, [getColumns, columnsReducer, token, canEdit, isAdmin]);

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
