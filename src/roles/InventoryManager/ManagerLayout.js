import { Navbar } from "./ManagerNav";
import { Topbar } from "../../components/Topbar";
import { Outlet, Routes, Route } from "react-router-dom";

import { Home as ManagerDashboard } from "./Home";
import { CheckInventory } from "./CheckInventory";
import { ViewRequests } from "./ViewRequests";
import { AddNewItem } from "./AddNewItem";
import { UpdateStorage } from "./UpdateStorage";

export function Layout() {
  return (
    <div className="flex">
      <div className="w-auto bg-red-800">
        <Navbar />
      </div>
      <div className="flex-1">
        <Topbar />
        <Routes>
          <Route path="" element={<ManagerDashboard />} />
          <Route path="checkInventory" element={<CheckInventory />} />
          <Route path="viewRequests" element={<ViewRequests />} />
          <Route path="addNewItem" element={<AddNewItem />} />
          <Route path="updateStorage" element={<UpdateStorage />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
}
