import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

import { MdCheckBox, MdEditSquare } from "react-icons/md";
import { FaSquareXmark } from "react-icons/fa6";
import { FaSortAmountUp } from "react-icons/fa";

export function ViewRequest() {
  const { user } = useAuthContext();
  const username = user.username;

  const [allRequests, setallRequests] = useState([]);
  const [isOkClicked, setIsOkClicked] = useState(false);
  const [inputValue, setInputValue] = useState("");

  //   const [req_id, setreq_id] = useState(0);
  const handleOk = async (req_id) => {
    setIsOkClicked(false);

    const response = await fetch(
      `/api/request/addcomment/${req_id}/${username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: inputValue }),
      }
    );
    const responseJSON = await response.json();

    setInputValue("");
  };

  console.log(" Reques hoilo ");
  console.log(allRequests);

  const handleAccept = async (req_id) => {
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
      setIsOkClicked(true);
    }
    // console.log("acccpet korteeeeeeeeee");
    // console.log(responseJSON);
  };

  const handleDelete = async (req_id) => {
    const response = await fetch(
      `/api/request/declinerequest/${req_id}/${user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJSON = await response.json();

    if (response.ok) {
      setIsOkClicked(true);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`/api/request/showrequests/${username}`);
        const json = await response.json();

        console.log("view requse");
        console.log(json);
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
    <div className="border border-pinky my-2 h-[1200px] rounded-2xl ">
      <div className="flex justify-between">
        <h2 className="text-left text-myText mt-7 ml-5 text-2xl font-bold">
          All Requests
        </h2>
        <div className="flex ">
          <input
            type="text"
            placeholder="Type here"
            className="border border-pinky bg-myBG rounded-lg text-myText text-sm placeholder:text-bg-gray-500 w-full p-2.5 m-5 focus:ring-1 focus:ring-pinky focus:outline-none focus:shadow-inner"
          />
        </div>
      </div>

      {/* this is individual request card */}

      <div className="flex flex-col w-full p-5 border gap-10">
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
                    Student Id:{" "}
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
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-3 md:gap-0">
                <button
                  onClick={() => {
                    handleAccept(request.req_id);
                  }}
                  className={`group bg-green-600 flex items-center justify-center gap-1 font-medium py-1.5 px-2.5 rounded-full
                    shadow-lg hover:shadow-xl  hover:scale-95 h-fit md:w-[105px]
                    active:scale-105 active:shadow-xl md:bg-transparent  md:shadow-none md:hover:scale-105 md:hover:shadow-none md:active:scale-95`}
                >
                  <div className={`font-bold text-white md:text-green-600`}>
                    {React.createElement(MdCheckBox, { size: "16" })}
                  </div>

                  <h2
                    className={`whitespace-pre duration-300 text-sm uppercase text-white md:text-green-600 md:block hidden`}
                  >
                    accept
                  </h2>

                  <h2
                    className={`
                  absolute bg-myBG whitespace-pre text-sm uppercase
                  text-green-600 rounded-xl drop-shadow-lg px-0 py-0 w-0 overflow-hidden
                  group-hover:px-2.5 group-hover:py-1.5 group-hover:-left-20 group-hover:duration-200 group-hover:w-fit
                  md:hidden
                  `}
                  >
                    accept
                  </h2>
                </button>

                <button
                  onClick={() => {
                    handleDelete(request.req_id);
                  }}
                  className={`group bg-pinky flex items-center gap-1 font-medium py-1.5 px-2.5 md:px-0 rounded-full
                    shadow-lg hover:shadow-xl  hover:scale-95 h-fit justify-center md:w-[105px]
                      
                    active:scale-105 active:shadow-xl md:bg-transparent  md:shadow-none md:hover:scale-105 md:hover:shadow-none md:active:scale-95`}
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

                <button
                  onClick={() => {}}
                  className={`group bg-blue-500 flex items-center gap-1 font-medium py-1.5 px-2.5 rounded-full
                    shadow-lg  h-fit justify-center md:w-[105px] md:bg-transparent  md:shadow-none md:hover:scale-105 md:hover:shadow-none md:active:scale-95
                    ${
                      request.permit <= 1
                        ? "disabled:opacity-50 disabled:cursor-not-allowed"
                        : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl"
                    } `}
                  disabled={request.permit <= 1}
                >
                  <div className={`font-bold text-white md:text-blue-500`}>
                    {React.createElement(FaSortAmountUp, { size: "15" })}
                  </div>

                  <h2
                    className={`whitespace-pre duration-300 text-sm uppercase text-white md:text-blue-500 md:block hidden`}
                  >
                    forward
                  </h2>

                  <h2
                    className={`
                  absolute bg-myBG whitespace-pre text-sm uppercase
                  text-blue-500 rounded-xl drop-shadow-lg px-0 py-0 w-0 overflow-hidden
                  group-hover:px-2.5 group-hover:py-1.5 group-hover:-left-24 group-hover:duration-200 group-hover:w-fit
                  md:hidden
                  `}
                  >
                    forward
                  </h2>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
