import React from "react";
import {
  DataGrid,
  GridColDef,
  GridColumnGroupingModel,
} from "@mui/x-data-grid";
import Fields from "../Shared/Types/Fields";
import fieldsExample from "../fields";
import { columnsAndGroups } from "../Shared/Types/Table";

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const columnGroupingModel = [
  {
    groupId: "",
    description: "",
    children: [{ field: "id" }],
  },
  {
    groupId: "Basic info",
    children: [
      {
        groupId: "Full name",
        children: [{ field: "lastName" }, { field: "firstName" }],
      },
      { field: "age" },
    ],
  },
];

const getColumnsAndGroups: columnsAndGroups = (fields: Fields[]) => {
  let columns: any[] = [];
  let groups: any[] = [];
  fields.forEach((field: Fields) => {
    if (field.type === "multi-attributes") {
      const recursionResult = getColumnsAndGroups(field.children as Fields[]);
      columns = [...columns, ...recursionResult.columns];
      groups = [
        ...groups,
        {
          groupId: field.name,
          children: [
            ...recursionResult.columns.map((column) => {
              return { field: column.field };
            }),
          ],
        },
      ];
    } else {
      columns = [
        ...columns,
        { field: field.id, headerName: field.name, width: 150 },
      ];
    }
  });
  return { columns, groups };
};

const Edit = () => {
  const data = getColumnsAndGroups(fieldsExample);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        experimentalFeatures={{ columnGrouping: true }}
        rows={[]}
        columns={data.columns}
        disableRowSelectionOnClick
        columnGroupingModel={data.groups}
      />
    </div>
  );
};

export default Edit;
