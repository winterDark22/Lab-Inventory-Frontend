import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages & components

import Login from "../src/pages/Login";

import { useAuthContext } from "./context/AuthContext";
import { Register } from "./pages/Register";
import StudentHome from "./roles/Student/Home";
import AssistantHome from "./roles/LabAssistant/Home";
import TeacherHome from "./roles/Teacher/Home";
import ManagerHome from "./roles/InventoryManager/Home";
import AdminHome from "./roles/SuperAdmin/Home";

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
              path="/manager/*"
              element={user ? <ManagerHome /> : <Navigate to="/" />}
            />
            ;
            <Route
              path="/student/*"
              element={user ? <StudentHome /> : <Navigate to="/" />}
            />
            ;
            <Route
              path="/labassistant/*"
              element={user ? <AssistantHome /> : <Navigate to="/" />}
            />
            ;
            <Route
              path="/teacher/*"
              element={user ? <TeacherHome /> : <Navigate to="/" />}
            />
            ;
            <Route
              path="/admin/*"
              element={user ? <AdminHome /> : <Navigate to="/" />}
            />
            ;
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
