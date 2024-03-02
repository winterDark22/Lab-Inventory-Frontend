import { Navbar } from "./StudentNav";
import { Outlet, Routes, Route } from "react-router-dom";

import { Home as StduentDashboard } from "./Home";
import { AddRequest } from "./AddRequest";

export function Layout() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="dashboard" element={<StduentDashboard />} />
        <Route path="addRequest" element={<AddRequest />} />
      </Routes>
      <Outlet />
    </div>
  );
}
