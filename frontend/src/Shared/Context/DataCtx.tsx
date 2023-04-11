import { createContext } from "react";
import { dataType, reducerActionType } from "../Types/Table";
import Fields from "../Types/Fields";
import columnsReducer from "../Types/Columns";

const DataCtx = createContext<{
  rows: dataType[];
  columns: Fields[];
  rowsDispatcher: React.Dispatch<reducerActionType>;
  columnsDispatcher: React.Dispatch<columnsReducer>;
}>({
  rows: [],
  columns: [],
  rowsDispatcher: () => {},
  columnsDispatcher: () => {},
});

export default DataCtx;
