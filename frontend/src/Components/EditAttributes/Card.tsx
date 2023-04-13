import {
  Button,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useTable from "../../Shared/Hooks/useTable";
import columnsReducer from "../../Shared/Types/Columns";
import Fields from "../../Shared/Types/Fields";
import MultiAttribute from "./MultiAttribute";
import SelectAttribute from "./SelectAttribute";

const Card = ({
  colIndex,
  col,
  columnsDispatcher,
}: {
  col: Fields;
  colIndex: number;
  columnsDispatcher: React.Dispatch<columnsReducer>;
}) => {
  const { changeColumn, deleteColumn } = useTable();

  return (
    <div
      key={colIndex}
      style={{
        marginTop: 20,
        padding: 20,
        width: "80%",
        backgroundColor: "#eeeeee",
        textAlign: "center",
        borderRadius: "10px",
      }}
    >
      <h2>{col.name}</h2>
      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          value={col.name}
          label={"כותרת"}
          InputLabelProps={{
            shrink: true,
          }}
          onBlur={() => {
            changeColumn(col.id, col);
          }}
          onChange={(e) => {
            columnsDispatcher({
              type: "changeColTitle",
              colId: col.id,
              value: e.target.value,
            });
          }}
        />
        <Select
          value={col.type}
          onBlur={() => {
            changeColumn(col.id, col);
          }}
          onChange={(e) => {
            columnsDispatcher({
              type: "changeColType",
              colId: col.id,
              value: e.target.value,
            });
          }}
          label={"סוג סעיף"}
        >
          <MenuItem value={"text"}>טקסט קצר</MenuItem>
          <MenuItem value={"multi-row"}>טקסט ארוך</MenuItem>
          <MenuItem value={"select"}>בחירה</MenuItem>
          <MenuItem value={"date"}>תאריך</MenuItem>
          <MenuItem value={"multi-attributes"}>מרובה ערכים</MenuItem>
        </Select>
        <Select
          value={col.width ? col.width : "big"}
          onBlur={() => {
            changeColumn(col.id, col);
          }}
          onChange={(e) => {
            columnsDispatcher({
              type: "changeColSize",
              colId: col.id,
              value: e.target.value,
            });
          }}
          label={"אורך שורה"}
        >
          <MenuItem value={"small"}>אורך שורה קצר</MenuItem>
          <MenuItem value={"medium"}>אורך שורה בינוני</MenuItem>
          <MenuItem value={"big"}>אורך שורה ארוך</MenuItem>
        </Select>
        <Button
          sx={{ py: "16.5px" }}
          onClick={async () => {
            await deleteColumn(col.id);
            columnsDispatcher({
              type: "removeCol",
              colId: col.id,
            });
          }}
          color={"error"}
          variant={"contained"}
        >
          מחק סעיף
        </Button>
        {col.type === "select" && (
          <Button
            sx={{ py: "16.5px" }}
            onBlur={() => {
              changeColumn(col.id, col);
            }}
            onClick={() => {
              columnsDispatcher({
                type: "addColOption",
                colId: col.id,
              });
            }}
            color={"success"}
            variant={"contained"}
          >
            הוסף ערך
          </Button>
        )}
        {col.type === "multi-attributes" && (
          <Button
            sx={{ py: "16.5px" }}
            color={"success"}
            onBlur={() => {
              changeColumn(col.id, col);
            }}
            onClick={() => {
              columnsDispatcher({
                type: "addSubCol",
                colId: col.id,
              });
            }}
            variant={"contained"}
          >
            הוסף תת סעיף
          </Button>
        )}
      </div>
      {col.type === "select" && (
        <SelectAttribute
          col={col}
          colId={col.id}
          columnsDispatcher={columnsDispatcher}
        />
      )}
      {col.type === "multi-attributes" && (
        <MultiAttribute col={col} columnsDispatcher={columnsDispatcher} />
      )}
    </div>
  );
};

export default Card;
