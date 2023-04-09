import Fields from "../Shared/Types/Fields";
import { fieldsExample, exampleData } from "../fields";
import DataTable, { TableColumn } from "react-data-table-component";
import ExpandedTab from "../Components/Edit/ExpandedTab";
import { useState } from "react";
import { columnsGeneratorType } from "../Shared/Types/Table";

// i dont care anymore
const columnsGenerator: columnsGeneratorType = (fields) => {
  let columns: any = [];
  fields.forEach((field: Fields) => {
    switch (field.type) {
      case "date":
        columns.push({
          selector: (row: any) => row[field.id],
          name: field.name,
          sortable: true,
        });
        break;
      case "multi-attributes":
        columns.push({
          cell: (row: any) => row[field.id].length,
          name: field.name,
          sortable: true,
        });
        break;
      default:
        columns.push({
          selector: (row: any) => row[field.id],
          name: field.name,
          sortable: true,
        });
        break;
    }
  });
  return columns;
};

const Edit = () => {
  // const multiFields: string[] = fieldsExample.reduce(
  //   (fields: string[], field) => {
  //     if (field.type === "multi-attributes") {
  //       return [...fields, field.id];
  //     } else {
  //       return fields;
  //     }
  //   },
  //   []
  // );
  // const data: { [key: string]: string }[] = exampleData(fieldsExample).map(
  //   (entryData) => {
  //     let newFormat = { ...entryData };
  //     multiFields.forEach((field) => {
  //       newFormat[field] = "" + Object.keys(newFormat[field]).length;
  //     });
  //     return newFormat as { [key: string]: string };
  //   }
  // );

  const [rows, setRows] = useState(exampleData(fieldsExample));
  const [columns, setColumns] = useState(fieldsExample);

  return (
    <div style={{ width: "100%", overflow: "auto" }}>
      {/* old MUI that didnt work */}
      {/* <DataGrid
        rows={data}
        columns={columnsGenerator(fieldsExample)}
        disableRowSelectionOnClick
        sx={{
          width: "100%",
          overflowX: "hidden",
          height: "80vh",
          margin: "auto",
          mt: 5,
          // make this thing readable
          "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": { py: "8px" },
          "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
            py: "15px",
          },
          "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
            py: "22px",
          },
          "& .MuiDataGrid-columnHeadersInner": {
            overflow: "auto",
          },
        }}
        getRowHeight={() => "auto"}
        density={"comfortable"}
      /> */}
      <DataTable
        columns={columnsGenerator(columns)}
        data={rows}
        expandableRows
        highlightOnHover
        pagination
        pointerOnHover
        responsive
        subHeaderWrap
        expandableRowsComponent={({ data }) => (
          <ExpandedTab columns={columns} data={data} />
        )}
        expandOnRowClicked
        expandOnRowDoubleClicked
      />
    </div>
  );
};

export default Edit;
