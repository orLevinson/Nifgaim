import { fieldsExample, exampleData } from "../fields";
import DataTable, { Direction } from "react-data-table-component";
import ExpandedTab from "../Components/Edit/ExpandedTab";
import { useCallback, useContext, useState } from "react";
import useTable from "../Shared/Hooks/useTable";
import { Button, TextField } from "@mui/material";
import { dataType } from "../Shared/Types/Table";
import DataCtx from "../Shared/Context/DataCtx";
import LoadingPage from "../Shared/UIElements/LoadingPage";
import { CSVLink } from "react-csv";
import useCSV from "../Shared/Hooks/useCSV";
import { cellAndHeaderStyle } from "../cssObjects";

const Edit = () => {
  const { columnsGenerator, addData } = useTable();
  // the rows don't need a function to clean and format the data
  // the columns are being generated by a function - the columns state only stores the raw data from the backend
  const { rows, columns, rowsDispatcher, loadingData } = useContext(DataCtx);
  const [filter, setFilter] = useState("");
  const [rowsCounter, setRowsCounter] = useState(1);
  const { GenerateCSV } = useCSV();

  const filteredData: () => dataType[] = useCallback(() => {
    if (filter === "") {
      return rows;
    }
    return rows.filter((row) => {
      const rowArr = Object.values(row);
      const check = rowArr.some((entry) =>
        (Array.isArray(entry) ? "" : entry).includes(filter)
      );
      return check ? true : false;
    });
  }, [rows, filter]);

  if (loadingData) {
    return (
      <div
        style={{
          width: "90%",
          height: "500px",
          margin: "auto",
          marginTop: 30,
          marginBottom: 30,
        }}
      >
        <LoadingPage />
      </div>
    );
  }

  return (
    <div
      style={{ width: "90%", margin: "auto", marginTop: 30, marginBottom: 30 }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>טבלת נתונים</h1>

        <div style={{ display: "flex", gap: "10px" }}>
          <TextField
            label="חיפוש"
            variant="filled"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
          <TextField
            type={"number"}
            label={"מספר עמודות להוספה"}
            value={rowsCounter}
            onChange={(e) => {
              setRowsCounter(Math.floor(parseInt(e.target.value)));
            }}
          ></TextField>
          <Button
            variant={"contained"}
            color={"success"}
            onClick={async () => {
              const arr = await addData(rowsCounter);
              rowsDispatcher({ type: "addRow", addRowArr: arr });
            }}
          >
            + הוספת רשומות
          </Button>
          <Button variant={"contained"}>
            <CSVLink
              filename={"nifgaim-report.csv"}
              style={{ color: "white", textDecoration: "none" }}
              data={GenerateCSV(filteredData())}
            >
              ייצוא לCSV
            </CSVLink>
          </Button>
        </div>
      </div>
      <DataTable
        columns={columnsGenerator(columns, rowsDispatcher)}
        data={filteredData()}
        direction={Direction.RTL}
        expandableRows
        highlightOnHover
        pagination
        pointerOnHover
        responsive
        subHeaderWrap
        paginationComponentOptions={{
          rowsPerPageText: "מספר רשומות בעמוד: ",
          rangeSeparatorText: "מתוך",
          noRowsPerPage: false,
          selectAllRowsItem: false,
          selectAllRowsItemText: "בחר הכל",
        }}
        noDataComponent={
          <div
            style={{
              marginTop: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...cellAndHeaderStyle,
            }}
          >
            אין עמודות להצגה
          </div>
        }
        customStyles={{
          cells: {
            style: cellAndHeaderStyle,
          },
          headCells: {
            style: { ...cellAndHeaderStyle, fontWeight: "bold" },
          },
        }}
        expandableRowsComponent={({ data }) => {
          return (
            <ExpandedTab
              dispatchRows={rowsDispatcher}
              columns={columns}
              data={data}
              rowId={data.id as string}
            />
          );
        }}
        expandOnRowClicked
        expandOnRowDoubleClicked
      />
    </div>
  );
};

export default Edit;
