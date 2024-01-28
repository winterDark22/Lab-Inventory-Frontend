import { Navbar } from "./Navbar";
import { Outlet, Routes, Route } from "react-router-dom";

import { Home as ManagerDashboard } from "../roles/InventoryManager/Home";
import { CheckInventory } from "../roles/InventoryManager/CheckInventory";
import { ViewRequests } from "../roles/InventoryManager/ViewRequests";
import { AddItem } from "../roles/InventoryManager/AddItem";

export function Layout() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="dashboard" element={<ManagerDashboard />} />
        <Route path="checkInventory" element={<CheckInventory />} />
        <Route path="viewRequests" element={<ViewRequests />} />
        <Route path="addItem" element={<AddItem />} />
      </Routes>
      <Outlet />
    </div>
  );
}
