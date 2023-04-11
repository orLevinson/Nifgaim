import Fields from "./Shared/Types/Fields";

const commands = ["פיקוד צפון", "פיקוד דרום", "פיקוד מרכז"];

export const fieldsExample: Fields[] = [
  {
    id: "1a",
    name: "שם מלא",
    type: "text",
    children: [],
    options: [],
    width: "medium",
  },
  {
    id: "2",
    name: "כתובת",
    type: "multi-row",
    children: [],
    options: [],
    width: "big",
  },
  {
    id: "2.5",
    name: "תאריך פטירה",
    type: "date",
    children: [],
    options: [],
    width: "small",
  },
  {
    id: "2.asdfasdfa",
    name: "תאריך לידה של הסבתא",
    type: "date",
    children: [],
    options: [],
    width: "small",
  },
  {
    id: "3",
    name: "פיקוד",
    type: "text",
    children: [],
    options: commands,
    width: "small",
  },
  {
    id: "4",
    name: "יחידה",
    type: "text",
    children: [],
    options: [],
    width: "medium",
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
        type: "multi-row",
        options: [],
      },
      {
        id: "8",
        name: "פיקוד",
        type: "select",
        options: commands,
      },
      {
        id: "812",
        name: "תאריך לידה",
        type: "date",
        options: [],
      },
    ],
    options: [],
    width: "small",
  },
  {
    id: "9",
    name: "שייך לקהילה מיוחדת?",
    type: "select",
    children: [],
    options: ["עבריים", "שומרונים", "בדואיים", "שומרוניים",],
    width: "medium",
  },
  {
    id: "91",
    name: "שייך לקהילה מיוחדת?",
    type: "select",
    children: [],
    options: ["עבריים", "שומרונים", "בדואיים", "שומרוניים"],
    width: "medium",
  },
  {
    id: "39",
    name: "שייך לקהילה מיוחדת?",
    type: "select",
    children: [],
    options: ["עבריים", "שומרונים", "בדואיים", "שומרוניים"],
    width: "medium",
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
            let value: any;
            switch (option.type) {
              case "text":
              case "multi-row":
                value = "שלום עולם";
                break;
              case "date":
                value = new Date().toISOString();
                break;
              default:
                value = commands[0];
                break;
            }
            item[option.id] = value;
          });
          res.push(item);
        }
        newEntry[field.id] = res;
      } else if (field.type === "date") {
        const date = new Date();
        newEntry[field.id] = date.toISOString();
      } else if (field.type === "select") {
        newEntry[field.id] = Array.isArray(field.options)
          ? field.options[Math.floor(Math.random() * field.options.length)]
          : "אופציה";
      } else {
        newEntry[field.id] = "שלום" + field.name;
      }
    });
    data.push(newEntry);
  }
  return data;
};
