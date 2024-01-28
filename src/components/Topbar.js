import { Link } from "react-router-dom";

export function Topbar() {
  return (
    <div className="flex items-center justify-between p-4">
      <h1 className="text-4xl text-primary font-bold font-roboto ml-72 px-8">
        CSE Lab Inventory Management System
      </h1>
      <div className="flex items-center space-x-2">
        <input
          type="search"
          placeholder="Type here..."
          className="border-2 border-gray-500 rounded-md p-2 mx-6 "
        />
        <button className="bg-blue-500 text-white rounded-md p-2">
          Settings
        </button>
        <button className="bg-green-500 text-white rounded-md p-2">
          Messages
        </button>
        <Link to="/logout" className="bg-red-500 text-white rounded-md p-2">
          Logout
        </Link>
      </div>
    </div>
  );
}
