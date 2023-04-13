import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import useTable from "../../Shared/Hooks/useTable";
import Fields from "../../Shared/Types/Fields";
import { dataType, reducerActionType } from "../../Shared/Types/Table";
import DateTabInput from "./TabInputs/DateTabInput";
import SelectTabInput from "./TabInputs/SelectTabInput";
import TextAreaTabInput from "./TabInputs/TextAreaTabInput";
import TextTabInput from "./TabInputs/TextTabInput";

// my solution for the expended tab
const ExpandedTab = ({
  dispatchRows,
  rowId,
  data,
  columns,
}: {
  dispatchRows: React.Dispatch<reducerActionType>;
  rowId: string;
  data: dataType;
  columns: Fields[];
}) => {
  // get all the multi attribute columns that needed to be rendered in the expanded tab
  const expandedCols = columns.filter((col) => col.type === "multi-attributes");

  return (
    <div style={{ width: "90vw" }}>
      {/* for each column that need to be expanded create a tab */}
      {expandedCols.map((col, columnIndex) => {
        const dataArr: {
          [key: string]: string;
        }[] = data[col.id] as {
          [key: string]: string;
        }[];
        return (
          <Container
            maxWidth={"lg"}
            sx={{
              backgroundColor: "#f8ccff",
              p: 3,
              mx: "auto",
              my: 3,
              borderRadius: 3,
              textAlign: "center",
            }}
            key={columnIndex}
          >
            <>
              <h1
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                {col.name}{" "}
                <Button
                  variant={"contained"}
                  color={"success"}
                  onClick={() => {
                    dispatchRows({
                      type: "addTab",
                      rowId: data.id as string,
                      columnId: col.id,
                    });
                  }}
                >
                  הוסף רשומה
                </Button>
              </h1>
              {/* go over all the data in the row for the given column */}
              <TableContainer component={Paper}>
                <Table aria-label="tab-Table">
                  <TableHead>
                    <TableRow>
                      {col.children?.map((subColumn, index) => {
                        return (
                          <TableCell align="right" key={index}>
                            {subColumn.name}
                          </TableCell>
                        );
                      })}
                      <TableCell align="right">מחק עמודה</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* for each array that holds data */}
                    {(dataArr && Array.isArray(dataArr) ? dataArr : []).map(
                      (subRow, subRowIndex) => {
                        return (
                          <TableRow
                            key={subRowIndex}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            {/* for each expanded columns create an input of the same nature and fill the data from the inputs*/}
                            {col.children?.map((subColumn, subColumnIndex) => {
                              let renderElement = <div>שגיאה</div>;
                              switch (subColumn.type) {
                                case "select":
                                  renderElement = (
                                    <SelectTabInput
                                      rowId={data.id as string}
                                      columnId={col.id}
                                      subRowIndex={subRowIndex}
                                      subColumnId={subColumn.id}
                                      data={subRow[subColumn.id]}
                                      changeHandler={dispatchRows}
                                      options={
                                        subColumn.options
                                          ? subColumn.options
                                          : []
                                      }
                                    />
                                  );
                                  break;
                                case "multi-row":
                                  renderElement = (
                                    <TextAreaTabInput
                                      rowId={data.id as string}
                                      columnId={col.id}
                                      subRowIndex={subRowIndex}
                                      subColumnId={subColumn.id}
                                      data={subRow[subColumn.id]}
                                      changeHandler={dispatchRows}
                                    />
                                  );
                                  break;
                                case "date":
                                  renderElement = (
                                    <DateTabInput
                                      rowId={data.id as string}
                                      columnId={col.id}
                                      subRowIndex={subRowIndex}
                                      subColumnId={subColumn.id}
                                      data={subRow[subColumn.id]}
                                      changeHandler={dispatchRows}
                                    />
                                  );
                                  break;
                                default:
                                  // text is default
                                  renderElement = (
                                    <TextTabInput
                                      rowId={data.id as string}
                                      columnId={col.id}
                                      subRowIndex={subRowIndex}
                                      subColumnId={subColumn.id}
                                      data={subRow[subColumn.id]}
                                      changeHandler={dispatchRows}
                                    />
                                  );
                                  break;
                              }
                              return (
                                <TableCell align="right" key={subColumnIndex}>
                                  {renderElement}
                                </TableCell>
                              );
                            })}
                            <TableCell align="right">
                              <Button
                                variant={"contained"}
                                color={"error"}
                                onClick={() => {
                                  dispatchRows({
                                    type: "removeTab",
                                    rowId: data.id as string,
                                    columnId: col.id,
                                    subRowIndex: subRowIndex,
                                  });
                                }}
                              >
                                מחק
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          </Container>
        );
      })}
    </div>
  );
};

export default React.memo(ExpandedTab);
