import Fields from "./Shared/Types/Fields";

const commands = ["פיקוד צפון", "פיקוד דרום", "פיקוד מרכז"];

const fieldsExample: Fields[] = [
  {
    id: "1",
    name: "שם מלא",
    type: "text",
    children: [],
    options: [],
  },
  {
    id: "2",
    name: "כתובת",
    type: "text",
    children: [],
    options: [],
  },
  {
    id: "2.5",
    name: "תאריך פטירה",
    type: "date",
    children: [],
    options: [],
  },
  {
    id: "3",
    name: "פיקוד",
    type: "text",
    children: [],
    options: commands,
  },
  {
    id: "4",
    name: "יחידה",
    type: "text",
    children: [],
    options: [],
  },
  {
    id: "5",
    name: "פרטי איש קשר",
    type: "multi-attributes",
    children: [
      {
        id: "6",
        name: "שם מלא",
        type: "text",
        options: [],
      },
      {
        id: "7",
        name: "כתובת",
        type: "text",
        options: [],
      },
      {
        id: "8",
        name: "פיקוד",
        type: "select",
        options: commands,
      },
    ],
    options: [],
  },
  {
    id: "9",
    name: "שייך לקהילה מיוחדת?",
    type: "select",
    children: [],
    options: ["עבריים", "שומרונים", "בדואיים", "שומרוניים"],
  },
];

export default fieldsExample;
