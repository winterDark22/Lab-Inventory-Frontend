import { Link } from "react-router-dom";
import { useLogout } from "../../hook/useLogout";

export function Navbar() {
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-[calc(100vh-32px)] bg-primary w-64 fixed top-0 left-0 overflow-auto m-4 rounded-2xl">
      <div className="text-white text-2xl font-bold px-10 py-6 font-roboto">
        Your Options
      </div>
      <hr className="border-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent h-0.5" />
      <ul>
        <li className="nav-box">
          <span className="nav-icon">add_box</span>
          <Link to="/student/addRequest" className="nav-link">
            Add request
          </Link>
        </li>

        <li className="nav-box">
          <span className="nav-icon">logout</span>
          <Link to="/" className="nav-link" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
