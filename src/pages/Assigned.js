import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useLogin } from "../hook/useLogin";

import { useAuthContext } from "../context/AuthContext";

function Assigned() {
  // console.log("there shoudl set the user");
  // console.log(responseJSON.role);

  const { user } = useAuthContext();

  console.log(user.assigned);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{ backgroundImage: 'url("bg_2.jpg")' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md">
          <div className="bg-red-800 p-4 rounded-xl mb-3">
            <h2 className="text-2xl font-bold mb-2 text-center text-white">
              CSE Lab Inventory <br />
              Management System
            </h2>
          </div>

          <div className="flex items-center justify-center p-4">
            <p className="text-gray-700 text-xl font-semibold">
              {user.assigned === 0
                ? " Registration pending"
                : user.assigned === 2
                ? " Your registration has not been accepted"
                : " Your location has not been assigned yet"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assigned;

// <div className="flex items-center justify-center h-screen bg-gray-100">
//   <div className="p-6 max-w-sm w-full shadow-md rounded-md bg-pinky">
//     <div className="flex justify-center items-center ">
//       <span className="text-white font-semibold text-2xl">
//         {user.assigned === 0
//           ? "Registration pending"
//           : "Your registration has not been accepted"}
//       </span>
//     </div>
//   </div>
// </div>
