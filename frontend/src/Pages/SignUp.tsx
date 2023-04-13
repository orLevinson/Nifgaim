import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Banner from "../Assets/LoginBanner.webp";
import GlobalCtx from "../Shared/Context/GlobalCtx";
import UserCtx from "../Shared/Context/UserCtx";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"נבנה על ידי בית התוכנה של חיל הלוגיסטיקה "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function SignUp() {
  const navigate = useNavigate();
  const { perm, permsLoaded } = React.useContext(GlobalCtx);
  const { register } = React.useContext(UserCtx);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!permsLoaded) {
      return;
    }

    if (
      registerState.name.length === 0 ||
      registerState.username.length === 0 ||
      registerState.password.length === 0
    ) {
      return;
    }

    register(
      registerState.username,
      registerState.password,
      registerState.perm,
      registerState.name
    );

    navigate("/");
  };
  const [registerState, setRegisterState] = React.useState<{
    name: string;
    username: string;
    password: string;
    perm: string[];
  }>({
    name: "",
    username: "",
    password: "",
    perm: [],
  });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(" + Banner + ")",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            הרשמה
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="שם מלא"
              name="name"
              autoComplete="name"
              autoFocus
              value={registerState.name}
              onChange={(e) => {
                setRegisterState((prev) => {
                  const shallowCopy = { ...prev };
                  shallowCopy.name = e.target.value;
                  return shallowCopy;
                });
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="שם משתמש"
              name="username"
              autoComplete="username"
              autoFocus
              value={registerState.username}
              onChange={(e) => {
                setRegisterState((prev) => {
                  const shallowCopy = { ...prev };
                  shallowCopy.username = e.target.value;
                  return shallowCopy;
                });
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="סיסמא"
              type="password"
              id="password"
              autoComplete="current-password"
              value={registerState.password}
              onChange={(e) => {
                setRegisterState((prev) => {
                  const shallowCopy = { ...prev };
                  shallowCopy.password = e.target.value;
                  return shallowCopy;
                });
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">הרשאות</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                multiple
                label="הרשאות"
                required
                fullWidth
                value={registerState.perm}
                onChange={(e) => {
                  setRegisterState((prev) => {
                    const shallowCopy = { ...prev };
                    shallowCopy.perm = Array.isArray(e.target.value)
                      ? e.target.value
                      : [e.target.value];
                    return shallowCopy;
                  });
                }}
              >
                {perm.map((permItem, permIndex) => {
                  return (
                    <MenuItem key={permIndex} value={permItem}>
                      {permItem}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              color="secondary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!permsLoaded}
            >
              הרשמה
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                navigate("/");
              }}
            >
              התחברות
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
