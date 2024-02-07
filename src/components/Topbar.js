import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export function Topbar() {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <div className="flex items-center justify-between p-4 mt-6">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-4xl font-bold font-roboto ml-72 px-8 tracking-wide text-red-700 ">
          CSE Lab Inventory Management System
        </h1>
        <div className="flex gap-2 mr-20">
          <button className="icon text-gray-600 text-xl">mail</button>
          <button className="icon text-gray-600 text-xl">account_circle</button>
          <h3 className="mt-0.5 font-bold text-gray-600">{user.username}</h3>
        </div>
      </div>
    </div>
  );
}
