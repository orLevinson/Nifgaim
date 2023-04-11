import { TableColumn } from "react-data-table-component";
import Fields from "./Fields";

// for the columns
export type columnsType = {
  id: string;
  perm: string;
  [key: string]: string | { [key: string]: string }[];
};

export type dataType = {
  id: string;
  perm: string;
  [key: string]:
    | string
    | {
        [key: string]: string;
      }[];
};

// for the columns generator
export type columnsGeneratorType = (
  fields: Fields[],
  changeHander: React.Dispatch<reducerActionType>
) => TableColumn<columnsType>[];

export type reducerActionType = {
  type:
    | "addRow"
    | "removeRow"
    | "changeRow"
    | "removeTab"
    | "addTab"
    | "changeTab";
  rowIndex?: number;
  rowId?: string;
  columnId?: string;
  subRowIndex?: number;
  subColumnId?: string;
  value?: string;
};
