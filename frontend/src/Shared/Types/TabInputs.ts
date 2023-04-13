import { dataType, reducerActionType } from "./Table";

export type TextTabInputProps = {
  rowId: string;
  columnId: string;
  subRowIndex?: number;
  subColumnId?: string;
  data?: string;
  changeHandler: React.Dispatch<reducerActionType>;
};

export type SelectTabInputProps = {
  rowId: string;
  columnId: string;
  subRowIndex?: number;
  subColumnId?: string;
  data?: string;
  options: string[];
  changeHandler: React.Dispatch<reducerActionType>;
};
