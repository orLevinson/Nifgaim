import { Button, InputAdornment, TextField } from "@mui/material";
import useTable from "../../Shared/Hooks/useTable";
import columnsReducer from "../../Shared/Types/Columns";
import Fields from "../../Shared/Types/Fields";

const SelectAttribute = ({
  col,
  colId,
  subColIndex,
  columnsDispatcher,
  isSubColSelect,
  colData,
}: {
  col: Fields;
  colId: string;
  subColIndex?: number;
  columnsDispatcher: React.Dispatch<columnsReducer>;
  isSubColSelect?: Boolean;
  colData?: Fields;
}) => {
  const { changeColumn } = useTable();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "80%",
        gap: "20px",
        margin: "auto",
        marginTop: "20px",
      }}
    >
      {(Array.isArray(col.options) ? col.options : []).map(
        (option, optionIndex) => {
          return (
            <div
              key={optionIndex}
              style={{
                display: "flex",
                flex: "1 0 21%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                size="small"
                value={option}
                inputProps={{
                  onKeyDown: (e) => {
                    if (e.key === "Enter") {
                      (e.currentTarget as HTMLInputElement).blur(); // blur the input to trigger the onBlur event
                    }
                  },
                  onBlur: () => {
                    if (colData) {
                      changeColumn(colData.id, colData);
                    } else {
                      changeColumn(col.id, col);
                    }
                  },
                }}
                onChange={(e) => {
                  columnsDispatcher({
                    type: isSubColSelect
                      ? "changeSubColOption"
                      : "changeColOption",
                    colId,
                    [isSubColSelect ? "subColOptionIndex" : "colOptionIndex"]:
                      optionIndex,
                    subColIndex,
                    value: e.target.value,
                  });
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="text"
                        onClick={() => {
                          columnsDispatcher({
                            type: isSubColSelect
                              ? "removeSubColOption"
                              : "removeColOption",
                            colId,
                            [isSubColSelect
                              ? "subColOptionIndex"
                              : "colOptionIndex"]: optionIndex,
                            subColIndex,
                          });
                        }}
                        color={"error"}
                      >
                        מחק
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          );
        }
      )}
    </div>
  );
};

export default SelectAttribute;
