import { GridColDef, GridColumnGroupingModel } from "@mui/x-data-grid";
import Fields from "./Fields";

export type columnsAndGroups = (fields: Fields[]) => {
  columns: GridColDef<never, any, any>[];
  groups: GridColumnGroupingModel;
};
