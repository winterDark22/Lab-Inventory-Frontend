import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages & components

import Login from "../src/pages/Login";
import { Layout as ManagerLayout } from "./roles/InventoryManager/ManagerLayout";

import { useAuthContext } from "./context/AuthContext";
import { Register } from "./pages/Register";
import StudentHome from "./roles/Student/Home";
import AssistantHome from "./roles/LabAssistant/Home";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="bg-gray-100 min-h-screen">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route
              path="/manager*"
              element={user ? <ManagerLayout /> : <Navigate to="/" />}
            />
            ;
            <Route
              path="/student*"
              element={user ? <StudentHome /> : <Navigate to="/" />}
            />
            ;
            <Route
              path="/labassistant*"
              element={user ? <AssistantHome /> : <Navigate to="/" />}
            />
            ;
            <Route
              path="/teacher*"
              element={user ? <StudentHome /> : <Navigate to="/" />}
            />
            ;
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

{
  /* <Route path="/manager/*" element={<ManagerLayout />} />
            <Route path="/student/*" element={<StudentLayout />} /> */
}
{
  /* <Route path="/*" element={<Layout />} /> */
}
{
  /* <Route path="/student/dashboard" element={<StudentDashboard />} /> */
}
{
  /* <Route
              path="/labAssistant/dashboard"
              element={<LabAssistantDashboard />}
            /> */
}
{
  /* <Route path="/student/addRequest" element={<AddRequest />} />
            <Route path="/student/details" element={<EquipmentDetail />} /> */
}
