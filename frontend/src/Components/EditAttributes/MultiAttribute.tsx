import { Button, MenuItem, Select, TextField } from "@mui/material";
import columnsReducer from "../../Shared/Types/Columns";
import Fields from "../../Shared/Types/Fields";
import SelectAttribute from "./SelectAttribute";

const MultiAttribute = ({
  col,
  columnsDispatcher,
}: {
  col: Fields;
  columnsDispatcher: React.Dispatch<columnsReducer>;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>תתי סעיפים</h2>
      {(Array.isArray(col.children) ? col.children : []).map(
        (subCol, subColIndex) => {
          return (
            <div key={subColIndex}>
              <h2>{subCol.name}</h2>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  value={subCol.name}
                  label={"כותרת"}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    columnsDispatcher({
                      type: "changeSubColTitle",
                      colId: col.id,
                      subColIndex,
                      value: e.target.value,
                    });
                  }}
                />
                <Select
                  value={subCol.type}
                  onChange={(e) => {
                    columnsDispatcher({
                      type: "changeSubColType",
                      colId: col.id,
                      subColIndex,
                      value: e.target.value,
                    });
                  }}
                  label={"סוג סעיף"}
                >
                  <MenuItem value={"text"}>טקסט קצר</MenuItem>
                  <MenuItem value={"multi-row"}>טקסט ארוך</MenuItem>
                  <MenuItem value={"select"}>בחירה</MenuItem>
                  <MenuItem value={"date"}>תאריך</MenuItem>
                </Select>
                <Button
                  sx={{ py: "16.5px" }}
                  color={"error"}
                  variant={"contained"}
                  onClick={() => {
                    columnsDispatcher({
                      type: "removeSubCol",
                      colId: col.id,
                      subColIndex,
                    });
                  }}
                >
                  מחק תת סעיף
                </Button>
                {subCol.type === "select" && (
                  <Button
                    sx={{ py: "16.5px" }}
                    color={"success"}
                    variant={"contained"}
                    onClick={() => {
                      columnsDispatcher({
                        type: "addSubColOption",
                        colId: col.id,
                        subColIndex,
                      });
                    }}
                  >
                    הוסף ערך
                  </Button>
                )}
              </div>
              {subCol.type === "select" && (
                <SelectAttribute
                  col={subCol}
                  colId={col.id}
                  subColIndex={subColIndex}
                  isSubColSelect={true}
                  columnsDispatcher={columnsDispatcher}
                />
              )}
            </div>
          );
        }
      )}
    </div>
  );
};

export default MultiAttribute;
