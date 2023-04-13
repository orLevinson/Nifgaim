import { dataType, reducerActionType } from "./Table";

export type TextInputProps = {
  rowId: string;
  rowIndex: number;
  columnId: string;
  rowData: dataType;
  data?: string;
  changeHandler: React.Dispatch<reducerActionType>;
};

export type SelectInputProps = {
  rowId: string;
  rowIndex: number;
  columnId: string;
  rowData: dataType;
  data?: string;
  options: string[];
  changeHandler: React.Dispatch<reducerActionType>;
};

export type PermInputProps = {
  rowId: string;
  data?: string;
  rowData: dataType;
  changeHandler: React.Dispatch<reducerActionType>;
};
