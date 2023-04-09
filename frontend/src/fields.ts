import Fields from "./Shared/Types/Fields";

const commands = ["פיקוד צפון", "פיקוד דרום", "פיקוד מרכז"];

export const fieldsExample: Fields[] = [
  {
    id: "1a",
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
    id: "5",
    name: "פרטי איש לא קשר קשר",
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
    width:"big"
  },
  {
    id: "91",
    name: "שייך לקהילה מיוחדת?",
    type: "select",
    children: [],
    options: ["עבריים", "שומרונים", "בדואיים", "שומרוניים"],
    width:"big"
  },
  {
    id: "39",
    name: "שייך לקהילה מיוחדת?",
    type: "select",
    children: [],
    options: ["עבריים", "שומרונים", "בדואיים", "שומרוניים"],
    width:"big"
  },
];

export const exampleData = (fields: Fields[]) => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    const newEntry: {
      [key: string]:
        | string
        | {
            [key: string]: string;
          }[];
    } = { id: `${i}-${Math.random()}` };

    fields.forEach((field) => {
      let res:
        | string
        | {
            [key: string]: string;
          }[];
      if (field.type === "multi-attributes") {
        res = [];
        for (let j = 0; j < Math.floor(Math.random() * 10); j++) {
          const item: {
            [key: string]: string;
          } = {};
          field.children!.forEach((option) => {
            item[option.id] = "היי" + option.name + j;
          });
          res.push(item);
        }
        newEntry[field.id] = res;
      } else if (field.type === "date") {
        const date = new Date();
        newEntry[field.id] = date.toISOString();
      } else {
        newEntry[field.id] = "שלום" + field.name;
      }
    });
    data.push(newEntry);
  }
  return data;
};
