import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { adminPermRoutes, editPermRoutes, publicRoutes } from "./routes";
import DataCtxProvider from "./Shared/Context/DataCtxProvider";
import UserCtx from "./Shared/Context/UserCtx";
import Navbar from "./Shared/UIElements/Navbar";

function App() {
  const UserCtxValues = useContext(UserCtx);
  let routeList = publicRoutes;
  let showNav = false;

  if (UserCtxValues.canEdit) {
    routeList = editPermRoutes;
    showNav = true;
  }
  if (UserCtxValues.isAdmin) {
    routeList = adminPermRoutes;
    showNav = true;
  }

  return (
    <div className="App">
      {showNav && <Navbar routes={routeList} />}
      <DataCtxProvider>
        <Routes>
          {routeList.map((route, index) => {
            return <Route key={index} path={route.url} element={route.page} />;
          })}
          <Route path="*" element={<></>} />
        </Routes>
      </DataCtxProvider>
    </div>
  );
}

export default App;
