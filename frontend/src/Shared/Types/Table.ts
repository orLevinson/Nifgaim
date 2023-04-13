import { TableColumn } from "react-data-table-component";
import Fields from "./Fields";

// for the columns
export type columnsType = {
  _id: string;
  id: string;
  // the perm string will look something like this "perm1~perm2~perm3"
  // you can use join and split to make them arrays
  perm: string;
  [key: string]: string | { [key: string]: string }[];
};

export type dataType = {
  _id: string;
  id: string;
  perm: string;
  [key: string]: string | { [key: string]: string }[];
};

// all the fetching of columns types

// get
export type getColumnsType = () => Promise<Fields[]>;

// add
export type addColumnsType = (number: number) => Promise<string[]>;

// delete
export type deleteColumnType = (id: string) => Promise<{ success: boolean }>;

// change
export type changeColumnType = (id: string, data: Fields) => Promise<Fields>;

// all the fetching of data types

// get
export type getDataType = () => Promise<dataType[]>;

// add
export type addDataType = (number: number) => Promise<string[]>;

// delete
export type deleteDataType = (id: string) => Promise<{ success: boolean }>;

// change
export type changeDataType = (id: string, data: dataType) => Promise<dataType>;

// for the columns generator
export type columnsGeneratorType = (
  fields: Fields[],
  changeHander: React.Dispatch<reducerActionType>
) => TableColumn<columnsType>[];

export type reducerActionType = {
  type:
    | "init"
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
  initData?: dataType[];
  addRowArr?: string[];
  isDateElement?: boolean;
};
