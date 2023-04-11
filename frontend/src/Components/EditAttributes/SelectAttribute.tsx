import { Button, InputAdornment, TextField } from "@mui/material";
import columnsReducer from "../../Shared/Types/Columns";
import Fields from "../../Shared/Types/Fields";

const SelectAttribute = ({
  col,
  colId,
  subColIndex,
  columnsDispatcher,
  isSubColSelect,
}: {
  col: Fields;
  colId: string;
  subColIndex?: number;
  columnsDispatcher: React.Dispatch<columnsReducer>;
  isSubColSelect?: Boolean;
}) => {
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
