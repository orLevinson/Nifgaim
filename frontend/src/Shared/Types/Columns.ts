type columnsReducer = {
  type:
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
  colId?: string;
  colOptionIndex?: number;
  subColIndex?: number;
  subColOptionIndex?: number;
  value?: string;
};
// each Col can be added\removed\change title,size and time\add,remove or change options
// each subCol can do the same without changing size

export default columnsReducer;
