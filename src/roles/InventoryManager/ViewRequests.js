import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

import { format } from "date-fns";

import { MdCheckBox, MdEditSquare } from "react-icons/md";
import { FaSquareXmark } from "react-icons/fa6";
import { FaSortAmountUp } from "react-icons/fa";

export function ViewRequests(params) {
  const { user } = useAuthContext();
  const username = user.username;

  const [allRequests, setallRequests] = useState([]);

  const handleAccept = async (req_id) => {
    //accept request
    const response = await fetch(
      `/api/request/acceptrequest/${req_id}/${user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJSON = await response.json();

    if (response.ok) {
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`/api/request/showrequests/${username}`);
        const json = await response.json();

        if (response.ok) {
          setallRequests(json);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRequests();
  }, []);
  return (
    <div className="flex flex-col w-full p-5 border gap-10 min-h-screen">
      {allRequests &&
        allRequests.map((request) => (
          <div className="w-full p-5 rounded-xl shadow-xl flex justify-between bg-myCard ">
            <div>
              <h2 className=" text-myText text-left font-bold">
                {" "}
                {request.equipment_name}
              </h2>
              <div className="mt-4 text-sm flex flex-col text-left">
                <span className="text-gray-500">
                  Lab Assistant:{" "}
                  <span className="text-myText font-bold">
                    &nbsp;{request.username}
                  </span>
                </span>
                <span className="text-gray-500">
                  Quantity:{" "}
                  <span className="text-myText font-bold">
                    &nbsp;{request.quantity}
                  </span>
                </span>
                <span className="text-gray-500">
                  Stock:{" "}
                  <span className="text-myText font-bold">
                    &nbsp;{request.available}
                  </span>
                </span>
                <span className="text-gray-500">
                  Status:{" "}
                  <span className="text-myText font-bold">
                    &nbsp;{request.status_name}
                  </span>
                </span>

                <span className="text-gray-500">
                  Requested:{" "}
                  <span className="text-myText font-bold">
                    &nbsp;
                    {format(new Date(request.req_time), "dd/MM/yyyy")}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex md:flex-row flex-col gap-3 md:gap-0">
              <button
                onClick={() => {
                  handleAccept(request.req_id);
                }}
                className={`group bg-green-700 flex items-center gap-1 font-medium py-1.5 px-2.5 rounded-full
              shadow-lg  h-fit justify-center md:w-[105px] md:bg-transparent  md:shadow-none 
              `}
              >
                <div className={`font-bold text-white md:text-green-700`}>
                  {React.createElement(MdCheckBox, { size: "16" })}
                </div>

                <h2
                  className={`whitespace-pre duration-300 text-sm uppercase text-white md:text-green-700 md:block hidden`}
                >
                  accept
                </h2>

                <h2
                  className={`
            absolute bg-myBG whitespace-pre text-sm uppercase
            text-green-700 rounded-xl drop-shadow-lg px-0 py-0 w-0 overflow-hidden
            group-hover:px-2.5 group-hover:py-1.5 group-hover:-left-20 group-hover:duration-200 group-hover:w-fit
            md:hidden
            `}
                >
                  accept
                </h2>
              </button>

              <button
                onClick={() => {}}
                className={`group bg-pinky flex items-center gap-1 font-medium py-1.5 px-2.5 rounded-full
              shadow-lg  h-fit justify-center md:w-[105px] md:bg-transparent  md:shadow-none 
               `}
              >
                <div className={`font-bold text-white md:text-pinky`}>
                  {React.createElement(FaSquareXmark, { size: "15" })}
                </div>

                <h2
                  className={`whitespace-pre duration-300 text-sm uppercase text-white  md:text-pinky md:block hidden`}
                >
                  reject
                </h2>

                <h2
                  className={`
            absolute bg-myBG whitespace-pre text-sm uppercase
            text-pinky rounded-xl drop-shadow-lg px-0 py-0 w-0 overflow-hidden
            group-hover:px-2.5 group-hover:py-1.5 group-hover:-left-20 group-hover:duration-200 group-hover:w-fit
            md:hidden
            `}
                >
                  reject
                </h2>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
