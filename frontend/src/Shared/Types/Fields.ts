type Fields = {
  id: string;
  name: string;
  type: "text" | "multi-row" | "select" | "date" | "multi-attributes";
  children?: {
    id: string;
    name: string;
    type: "text" | "multi-row" | "select" | "date";
    options?: string[];
  }[];
  options?: string[];
  width?: "big"|"medium"|"small";
};

export default Fields;
