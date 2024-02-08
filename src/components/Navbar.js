import { Link } from "react-router-dom";
import MaterialIcon, { colorPalette } from "material-icons-react";

export function Navbar() {
  return (
    <div className="h-[calc(100vh-32px)] bg-primary w-60 fixed top-0 left-0 overflow-auto m-4 rounded-2xl">
      <div className="text-white text-2xl font-bold px-10 py-6 font-roboto">
        Your Options
      </div>
      <hr className="border-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent h-0.5" />
      <ul>
        <li className="nav-box">
          <span className="nav-icon">app_registration</span>
          <Link to="/manager/checkInventory" className="nav-link">
            Check inventory
          </Link>
        </li>

        <li className="nav-box">
          <span className="nav-icon">receipt_long</span>
          <Link to="/manager/viewRequests" className="nav-link">
            View requests
          </Link>
        </li>

        <li className="nav-box">
          <span className="nav-icon">add_shopping_cart</span>
          <Link to="/manager/addNewItem" className="nav-link">
            Add new item
          </Link>
        </li>

        <li className="nav-box">
          <span className="nav-icon">add_box</span>
          <Link to="/manager/updateStorage" className="nav-link">
            Update storage
          </Link>
        </li>

        <li className="nav-box">
          <span className="nav-icon">logout</span>
          <Link to="/manager/addItem" className="nav-link">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
