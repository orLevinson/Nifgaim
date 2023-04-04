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
};

export default Fields;
