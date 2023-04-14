import React from "react";
const Edit = React.lazy(() => import("./Pages/Edit"));
const EditAttributes = React.lazy(() => import("./Pages/EditAttributes"));
const EditPerms = React.lazy(() => import("./Pages/EditPerms"));
const EditUsers = React.lazy(() => import("./Pages/EditUsers"));
const Login = React.lazy(() => import("./Pages/Login"));
const SignUp = React.lazy(() => import("./Pages/SignUp"));
const Welcome = React.lazy(() => import("./Pages/Welcome"));

export const publicRoutes = [
  {
    name: "התחברות",
    url: "/",
    page: <Login />,
  },
  {
    name: "הרשמה",
    url: "/signUp",
    page: <SignUp />,
  },
];

export const editPermRoutes = [
  {
    name: "דף הבית",
    url: "/",
    page: <Welcome />,
  },
  {
    name: "עריכת נתונים",
    url: "/edit",
    page: <Edit />,
  },
];

export const adminPermRoutes = [
  {
    name: "דף הבית",
    url: "/",
    page: <Welcome />,
  },
  {
    name: "עריכת נתונים",
    url: "/edit",
    page: <Edit />,
  },
  {
    name: "עריכת סעיפים",
    url: "/editAttributes",
    page: <EditAttributes></EditAttributes>,
  },
  {
    name: "ניהול משתמשים",
    url: "/editUsers",
    page: <EditUsers></EditUsers>,
  },
  {
    name: "ניהול הרשאות",
    url: "/editPerms",
    page: <EditPerms></EditPerms>,
  },
];
