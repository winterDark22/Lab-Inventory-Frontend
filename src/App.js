import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages & components

import Login from "../src/pages/Login";
import { Layout as ManagerLayout } from "./roles/InventoryManager/ManagerLayout";
import { Layout as StudentLayout } from "./roles/Student/StudentLayout";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/login" element={<Login />} /> */}

            <Route path="/manager/*" element={<ManagerLayout />} />
            <Route path="/student/*" element={<StudentLayout />} />

            {/* <Route path="/*" element={<Layout />} /> */}

            {/* <Route path="/student/dashboard" element={<StudentDashboard />} /> */}
            {/* <Route
              path="/labAssistant/dashboard"
              element={<LabAssistantDashboard />}
            /> */}

            {/* <Route path="/student/addRequest" element={<AddRequest />} />
            <Route path="/student/details" element={<EquipmentDetail />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
