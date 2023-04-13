type Fields = {
  id: string;
  _id?: string;
  name: string;
  type: "text" | "multi-row" | "select" | "date" | "multi-attributes";
  children?: {
    id: string;
    name: string;
    type: "text" | "multi-row" | "select" | "date";
    options?: string[];
    width?: "big" | "medium" | "small";
  }[];
  options?: string[];
  width?: "big" | "medium" | "small";
};

export default Fields;
