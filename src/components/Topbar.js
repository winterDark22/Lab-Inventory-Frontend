import { Link } from "react-router-dom";

export function Topbar() {
  return (
    <div className="flex items-center justify-between p-4">
      <h1 className="text-4xl text-primary font-bold font-roboto ml-72 px-8">
        CSE Lab Inventory Management System
      </h1>
      <div className="flex items-center space-x-2">
        {/* <button className="bg-primary text-white rounded-md p-2">
          Settings
        </button>
        <button className="bg-primary-500 text-white rounded-md p-2">
          Messages
        </button> */}
      </div>
    </div>
  );
}
