import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

import { MdCheckBox, MdEditSquare } from "react-icons/md";
import { FaSquareXmark } from "react-icons/fa6";
import { FaSortAmountUp } from "react-icons/fa";

export function ViewRequest() {
  const { user } = useAuthContext();
  const username = user.username;

  const [allRequests, setallRequests] = useState([]);
  //filter requests by status
  const [filter, setFilter] = useState("Pending");

  const [selectedRequest, setSelectedRequest] = useState(null);

  const [inputValue, setInputValue] = useState(""); //for accept+reject
  const [showModal, setShowModal] = useState(false);

  const [rejection, setRejection] = useState(false);

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
      setShowModal(true);
    }
  };

  const handleReject = async (req_id) => {
    //reject request
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
      setShowModal(true);
    }
  };

  const handleOk = async () => {
    if (inputValue.trim() === "") {
      // Handle the situation when inputValue is an empty string
      if (rejection) {
        setInputValue(
          "Your request has been rejected. Please contact the lab supervisor for more details."
        );
      } else {
        setInputValue("Your request has accepted. Collect it from the lab");
      }
    }

    const req_id = selectedRequest.req_id;

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

    if (response.ok) {
      setallRequests(
        allRequests.map((request) =>
          request.req_id === req_id
            ? { ...request, status_name: rejection ? "Rejected" : "Accepted" }
            : request
        )
      );

      // Set the filtered list as the new value of allRequests
      //setallRequests(updatedRequests);
    }

    setSelectedRequest(null);
    setShowModal(false);
    setInputValue("");
    setRejection(false);
  };

  const handleForward = async (req_id) => {
    const response = await fetch(
      `/api/request/forwardrequesttohead/${req_id}/${user.username}`,
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

  const handleCancel = async () => {
    const req_id = selectedRequest.req_id;

    setInputValue("");

    if (rejection) {
      setInputValue(
        "Your request has been rejected. Please contact the lab supervisor for more details."
      );
    } else {
      setInputValue("Your request has accepted. Collect it from the lab");
    }

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

    if (response.ok) {
      setallRequests(
        allRequests.map((request) =>
          request.req_id === req_id
            ? { ...request, status_name: rejection ? "Rejected" : "Accepted" }
            : request
        )
      );
    }

    setSelectedRequest(null);
    setShowModal(false);
    setInputValue("");
    setRejection(false);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          `/api/request/showrequestssupervisor/${username}`
        );
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

  const filteredRequestsByStatus = allRequests.filter((request) => {
    if (filter === "All") return true;
    if (filter === "Pending")
      return request.status_name === "Waiting for Supervisor approval";
    if (filter === "Accepted") return request.status_name === "Accepted";
    if (filter === "Rejected") return request.status_name === "Rejected";

    return (
      request.status_name !== "Accepted" &&
      request.status_name !== "Rejected" &&
      request.status_name !== "Waiting for Supervisor approval"
    );
  });

  return (
    <div className="flex flex-col w-full p-5 border gap-10 min-h-screen">
      <div className="flex flex-col justify-start items-start gap-5 mt-7 mr-5">
        <div className="flex items-center justify-between gap-4 ">
          {/* <h2 className="text-left text-myText mt-7 ml-5 text-2xl font-bold">
          All Requests
        </h2> */}
          <button
            onClick={() => setFilter("Pending")}
            className={`hover:text-primary text-xs uppercase p-3 w-24 rounded-lg text-gray-600 bg-myCard  active:text-myText focus:text-primary`}
          >
            {" "}
            Pending
          </button>
          <button
            onClick={() => setFilter("Forwarded")}
            className={`hover:text-primary text-xs uppercase p-3 w-24 rounded-lg text-gray-600 bg-myCard  active:text-myText focus:text-primary`}
          >
            {" "}
            Forwarded
          </button>
          <button
            onClick={() => setFilter("Accepted")}
            className={`hover:text-primary text-xs uppercase p-3 w-24 rounded-lg text-gray-600 bg-myCard  active:text-myText focus:text-primary`}
          >
            {" "}
            Accepted
          </button>
          <button
            onClick={() => setFilter("Rejected")}
            className={`hover:text-primary text-xs uppercase p-3 w-24 rounded-lg text-gray-600 bg-myCard  active:text-myText focus:text-primary`}
          >
            {" "}
            Rejected
          </button>
          <button
            onClick={() => setFilter("All")}
            className={`hover:text-primary text-xs uppercase p-3 w-24 rounded-lg text-gray-600 bg-myCard  active:text-myText focus:text-primary`}
          >
            {" "}
            All
          </button>
        </div>
      </div>

      {/* this is individual request card */}

      {/* <div className="flex flex-col w-full p-5 border gap-10"> */}
      {filteredRequestsByStatus &&
        filteredRequestsByStatus.map((request) => (
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
                <span className="text-gray-500">
                  Status:{" "}
                  <span className="text-myText font-bold">
                    &nbsp;{request.status_name}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex md:flex-row flex-col gap-3 md:gap-0">
              <button
                onClick={() => {
                  setSelectedRequest(request);

                  handleAccept(request.req_id);
                }}
                className={`group bg-green-700 flex items-center gap-1 font-medium py-1.5 px-2.5 rounded-full
                    shadow-lg  h-fit justify-center md:w-[105px] md:bg-transparent  md:shadow-none 
                    ${
                      request.permit > 2 ||
                      request.status_name === "Accepted" ||
                      request.status_name === "Rejected"
                        ? "disabled:opacity-50 disabled:cursor-not-allowed"
                        : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
                    } `}
                disabled={
                  request.permit > 2 ||
                  request.status_name === "Accepted" ||
                  request.status_name === "Rejected"
                }
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
                onClick={() => {
                  setSelectedRequest(request);
                  handleReject(request.req_id);
                  setRejection(true);
                }}
                className={`group bg-pinky flex items-center gap-1 font-medium py-1.5 px-2.5 rounded-full
                    shadow-lg  h-fit justify-center md:w-[105px] md:bg-transparent  md:shadow-none 
                    ${
                      request.permit > 2 ||
                      request.status_name === "Accepted" ||
                      request.status_name === "Rejected"
                        ? "disabled:opacity-50 disabled:cursor-not-allowed"
                        : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
                    } `}
                disabled={
                  request.permit > 2 ||
                  request.status_name === "Accepted" ||
                  request.status_name === "Rejected"
                }
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
                onClick={() => {
                  setSelectedRequest(request);
                  handleForward(request.req_id);
                }}
                className={`group bg-blue-500 flex items-center gap-1 font-medium py-1.5 px-2.5 rounded-full
                    shadow-lg  h-fit justify-center md:w-[105px] md:bg-transparent  md:shadow-none 
                    ${
                      request.permit === 2
                        ? "disabled:opacity-50 disabled:cursor-not-allowed"
                        : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
                    } `}
                disabled={request.permit === 2}
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

      {showModal && (
        <div className="fixed w-full bg-black bg-opacity-50 top-0 left-0 z-30">
          <div className="flex items-center justify-center min-h-screen  sm:block sm:p-0">
            {/* ...rest of the modal code... */}
            <div className="bg-white ml-[35vw] rounded-lg text-left overflow-hidden sm:mt-[20vh] sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex fle items-stretch">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-grow">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Comments
                    </h3>

                    <div className="mt-4">
                      <textarea
                        value={inputValue}
                        placeholder="Add your comments here"
                        onChange={(e) => setInputValue(e.target.value)}
                        className="p-2 border rounded text-sm w-full focus:outline-none focus:ring-1 focus:ring-pinky focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex justify-center gap-12 ">
                <button
                  onClick={() => handleCancel()}
                  // onClick={() => handleUpdate(selectedEquipment)}
                  className="text-white bg-pinky  border-0 py-1 sm:px-4 px-2 focus:outline-none hover:bg-primary rounded-lg text-base"
                >
                  Cancel
                </button>
                <button
                  className="text-white  bg-green-600 border-0 sm:px-4 px-2 py-1 focus:outline-none  hover:bg-green-700 rounded-lg text-base"
                  onClick={() => handleOk()}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
