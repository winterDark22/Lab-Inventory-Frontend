import { Navbar } from "./StudentNav";
import { Outlet, Routes, Route } from "react-router-dom";

import { Home as StduentDashboard } from "./Home";
import { AddRequest } from "./AddRequest";
import { Topbar } from "../../components/Topbar";
import { ProductDetail } from "../../components/Detail";

export function Layout() {
  return (
    <div className="flex">
      <div className="w-auto bg-red-800">
        <Navbar />
      </div>
      <div className="flex-1">
        <Topbar />
        <Routes>
          <Route path="" element={<StduentDashboard />} />
          <Route path="details/:id" element={<ProductDetail />} />

          <Route path="addRequest" element={<AddRequest />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
}

// <div className="w-auto bg-red-800">
//   <Navbar />
// </div>
