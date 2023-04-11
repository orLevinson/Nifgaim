export type globalReducerType = {
  type: "addPerm" | "removePerm" | "changePerm" | "initPerm";
  permIndex?: number;
  value?: string;
  state?: string[];
};
