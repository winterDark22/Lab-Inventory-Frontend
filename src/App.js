import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages & components
import Home from "../src/roles/InventoryManager/Home";
import Login from "../src/pages/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
