import Edit from "./Pages/Edit";
import EditAttributes from "./Pages/EditAttributes";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

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

export const viewPermRoutes = [
  {
    name: "צפייה בנתונים",
    url: "/viewOnly",
    page: <></>,
  },
];

export const editPermRoutes = [
  {
    name: "עריכת נתונים",
    url: "/edit",
    page: <Edit />,
  },
];

export const adminPermRoutes = [
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
    page: <></>,
  },
  {
    name: "ניהול עץ מבנה",
    url: "/editUnits",
    page: <></>,
  },
];
