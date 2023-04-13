import {
  Button,
  Checkbox,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { user } from "../../Shared/Types/Users";

const UsersTable = ({
  users,
  perm,
  changeUsers,
}: {
  users: user[];
  perm: string[];
  changeUsers: React.Dispatch<React.SetStateAction<user[]>>;
}) => {
  return (
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
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">מס"ד</TableCell>
              <TableCell align="right">שם מלא</TableCell>
              <TableCell align="right">הרשאות</TableCell>
              <TableCell align="right">הרשאות עריכה</TableCell>
              <TableCell align="right">הרשאות ניהול</TableCell>
              <TableCell align="right">מחק משתמש</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, userIndex) => (
              <TableRow
                key={userIndex}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">
                  <b>{userIndex + 1}.</b>
                </TableCell>
                <TableCell align="right">{user.name}</TableCell>
                <TableCell align="right">
                  <Select
                    label={"הרשאות"}
                    multiple
                    value={user.perm}
                    onChange={(e) => {
                      changeUsers((prev) => {
                        const shallowCopy = [...prev];
                        shallowCopy[userIndex].perm = Array.isArray(
                          e.target.value
                        )
                          ? e.target.value
                          : [e.target.value];
                        return shallowCopy;
                      });
                    }}
                  >
                    {perm.map((perm, permIndex) => {
                      return (
                        <MenuItem key={permIndex} value={perm}>
                          {perm}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </TableCell>
                <TableCell align="right">
                  <Checkbox
                    checked={user.canEdit}
                    onChange={() => {
                      changeUsers((prev) => {
                        const shallowCopy = [...prev];
                        shallowCopy[userIndex].canEdit =
                          !shallowCopy[userIndex].canEdit;
                        return shallowCopy;
                      });
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Checkbox
                    checked={user.isAdmin}
                    onChange={() => {
                      changeUsers((prev) => {
                        const shallowCopy = [...prev];
                        shallowCopy[userIndex].isAdmin =
                          !shallowCopy[userIndex].isAdmin;
                        return shallowCopy;
                      });
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="text"
                    color={"error"}
                    onClick={() => {
                      changeUsers((prev) => {
                        const shallowCopy = [...prev];
                        shallowCopy.splice(userIndex, 1);
                        return shallowCopy;
                      });
                    }}
                  >
                    מחק
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersTable;
