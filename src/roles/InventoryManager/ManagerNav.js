import { Link } from "react-router-dom";
import MaterialIcon, { colorPalette } from "material-icons-react";
import { useLogout } from "../../hook/useLogout";
import { useAuthContext } from "../../context/AuthContext";

export function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-[calc(100vh-32px)] bg-red-800 w-60 fixed top-0 left-0 overflow-auto m-4 rounded-2xl flex flex-col justify-between">
      <div>
        <div className="flex items-center text-gray-200 px-14 py-6 font-roboto">
          <span className="icon text-3xl mr-2">dashboard</span>
          <span className="text-2xl font-bold">Home</span>
        </div>
        <hr className="border-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent h-0.5" />
        <ul>
          <Link to="/manager/checkInventory" className="nav-link">
            <li className="nav-box">
              <span className="nav-icon">app_registration</span>
              <span>Check inventory</span>
            </li>
          </Link>

          <Link to="/manager/viewRequests" className="nav-link">
            <li className="nav-box">
              <span className="nav-icon">receipt_long</span>
              <span>View requests</span>
            </li>
          </Link>

          <Link to="/manager/addNewItem" className="nav-link">
            <li className="nav-box">
              <span className="nav-icon">add_shopping_cart</span>
              <span>Add new item</span>
            </li>
          </Link>

          <Link to="/manager/updateStorage" className="nav-link">
            <li className="nav-box">
              <span className="nav-icon">add_box</span>
              <span>Update storage</span>
            </li>
          </Link>

          <Link to="/" onClick={handleLogout}>
            <li className="nav-box">
              <span className="nav-icon">logout</span>
              <span className="nav-link">Logout</span>
            </li>
          </Link>
        </ul>
      </div>
      <button className="bg-green-600 text-white py-1 px-4 rounded m-4 w-auto pointer-events-none ">
        {user.role}
      </button>
    </div>
  );
}
