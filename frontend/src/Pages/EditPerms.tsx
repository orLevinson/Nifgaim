import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useContext } from "react";
import GlobalCtx from "../Shared/Context/GlobalCtx";

const EditPerms = () => {
  const { perms, changePerms, permsLoaded } = useContext(GlobalCtx);

  if (!permsLoaded) {
    return (
      <div
        style={{
          width: "90%",
          margin: "auto",
          marginTop: 30,
          marginBottom: 30,
        }}
      >
        <h1>הרשאות בטעינה</h1>
      </div>
    );
  }

  return (
    <div
      style={{ width: "90%", margin: "auto", marginTop: 30, marginBottom: 30 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>ניהול הרשאות</h1>
        <Button
          variant="contained"
          color={"success"}
          onClick={() => {
            changePerms({ type: "addPerm" });
          }}
        >
          הוסף הרשאה
        </Button>
      </div>

      <div
        style={{
          marginTop: 20,
          padding: 20,
          width: "90%",
          margin: "auto",
          backgroundColor: "#eeeeee",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
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
          {perms.map((perm, permIndex) => {
            return (
              <div
                key={permIndex}
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
                  value={perm}
                  onChange={(e) => {
                    changePerms({
                      type: "changePerm",
                      permIndex,
                      value: e.target.value,
                    });
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          variant="text"
                          color={"error"}
                          onClick={() => {
                            changePerms({ type: "removePerm", permIndex });
                          }}
                        >
                          מחק
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EditPerms;
