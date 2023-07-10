import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./middleware/ProtectedRoutes";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage"
import Errorpage from "./pages/Errorpage"
import Register from "./pages/Register";
function App() {
  return (
    <div style={{ height: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/Homepage" element={<Homepage />} />
          </Route>
          <Route path="/Register" element={<Register />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
