import { Routes, Route, Outlet, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<></>}>
          <Route index element={<></>} />
          <Route path="about" element={<></>} />
          <Route path="dashboard" element={<></>} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<></>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
