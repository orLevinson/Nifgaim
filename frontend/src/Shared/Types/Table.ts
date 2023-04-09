import { TableColumn } from "react-data-table-component";
import Fields from "./Fields";

// for the columns
export type columnsType = {
  [key: string]: string | { [key: string]: string }[];
};

export type dataType = {
  [key: string]:
    | string
    | {
        [key: string]: string;
      }[];
};

// for the columns generator
export type columnsGeneratorType = (
  fields: Fields[]
) => TableColumn<columnsType>[];
