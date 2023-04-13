import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UserCtxProvider from "./Shared/Context/UserCtxProvider";
import { createTheme, ThemeProvider } from "@mui/material";
import { heIL } from "@mui/material/locale";
import GlobalCtxProvider from "./Shared/Context/GlobalCtxProvider";
import LoadingCtxProvider from "./Shared/Context/loadingCtxProvider";

const theme = createTheme({}, heIL);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <LoadingCtxProvider>
        <UserCtxProvider>
          <GlobalCtxProvider>
            <App />
          </GlobalCtxProvider>
        </UserCtxProvider>
      </LoadingCtxProvider>
    </ThemeProvider>
  </BrowserRouter>
);
