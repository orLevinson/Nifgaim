import { reducerActionType } from "./Table";

export type TextTabInputProps = {
  rowId: string;
  rowIndex: number;
  columnId: string;
  subRowIndex?: number;
  subColumnId?: string;
  data?: string;
  changeHandler: React.Dispatch<reducerActionType>;
};
