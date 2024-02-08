import { Topbar } from "../../components/Topbar";
import { Outlet, Routes, Route } from "react-router-dom";

import { Home as AssistantDashoboard } from "./Home";

export function Layout() {
  return (
    <div className="flex">
      {/* <div className="w-auto bg-red-800">
        <Navbar />
      </div> */}
      <div className="flex-1">
        <Topbar />
        <Routes>
          <Route path="" element={<AssistantDashoboard />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
}
