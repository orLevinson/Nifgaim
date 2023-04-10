import { reducerActionType } from "./Table";

export type TextInputProps = {
  rowId: string;
  rowIndex: number;
  columnId: string;
  data?: string;
  changeHandler: React.Dispatch<reducerActionType>;
};

export type SelectInputProps = {
  rowId: string;
  rowIndex: number;
  columnId: string;
  data?: string;
  options: string[];
  changeHandler: React.Dispatch<reducerActionType>;
};
