import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import Fields from "../../Shared/Types/Fields";
import { dataType, reducerActionType } from "../../Shared/Types/Table";
import TextTabInput from "./TabInputs/TextTabInput";

// my solution for the expended tab
const ExpandedTab = ({
  dispatchRows,
  rowIndex,
  data,
  columns,
}: {
  dispatchRows: React.Dispatch<reducerActionType>;
  rowIndex: number;
  data: dataType;
  columns: Fields[];
}) => {
  // get all the multi attribute columns that needed to be rendered in the expanded tab
  const expandedCols = columns.filter((col) => col.type === "multi-attributes");

  useEffect(() => {
    console.log("remounted expanded tab");
  }, []);

  return (
    <div>
      {/* for each column */}
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
              <h1>{col.name}</h1>
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataArr.map((subRow, subRowIndex) => {
                      return (
                        <TableRow
                          key={subRowIndex}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          {col.children?.map((subColumn, subColumnIndex) => {
                            let renderElement = <div>שגיאה</div>;
                            switch (subColumn.type) {
                              case "select":
                                break;
                              case "multi-row":
                                break;
                              case "date":
                                break;
                              default:
                                // text is default
                                renderElement = (
                                  <TextTabInput
                                    rowId={data.id as string}
                                    rowIndex={rowIndex}
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
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <p> */}
              {/* for each child(type of entry in the expanded column) create an input that will have the same value as the data given */}
              {/* {col.children?.map((entry) => {
                        return <Input value={row[entry.id]} />;
                      })} */}
              {/* </p> */}
            </>
          </Container>
        );
      })}
    </div>
  );
};

export default React.memo(ExpandedTab);
