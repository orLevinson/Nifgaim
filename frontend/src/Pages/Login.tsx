import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
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

export default function Login() {
  const navigate = useNavigate();
  const { login } = React.useContext(UserCtx);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginState.username.length === 0 || loginState.password.length === 0) {
      return;
    }

    login(loginState.username, loginState.password);

    navigate("/");
  };
  const [loginState, setLoginState] = React.useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
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
            התחברות
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
              id="username"
              label="שם משתמש"
              name="username"
              autoComplete="username"
              autoFocus
              value={loginState.username}
              onChange={(e) => {
                setLoginState((prev) => {
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
              value={loginState.password}
              onChange={(e) => {
                setLoginState((prev) => {
                  const shallowCopy = { ...prev };
                  shallowCopy.password = e.target.value;
                  return shallowCopy;
                });
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              התחבר
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => {
                navigate("/signup");
              }}
            >
              הרשמה
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
