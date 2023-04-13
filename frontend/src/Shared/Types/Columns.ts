import Fields from "./Fields";

type columnsReducer = {
  type:
    | "init"
    | "addCol"
    | "removeCol"
    | "changeColType"
    | "changeColTitle"
    | "changeColSize"
    | "addColOption"
    | "removeColOption"
    | "changeColOption"
    | "addSubCol"
    | "removeSubCol"
    | "changeSubColTitle"
    | "changeSubColType"
    | "addSubColOption"
    | "removeSubColOption"
    | "changeSubColOption";
  initData?: Fields[];
  addColArr?: string[];
  colId?: string;
  colOptionIndex?: number;
  subColIndex?: number;
  subColOptionIndex?: number;
  value?: string;
};
// each Col can be added\removed\change title,size and time\add,remove or change options
// each subCol can do the same without changing size

export default columnsReducer;
