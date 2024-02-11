import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

import { MdCheckBox, MdEditSquare } from "react-icons/md";
import { FaSquareXmark } from "react-icons/fa6";
import { FaSortAmountUp } from "react-icons/fa";

export function ViewRequest() {
  const { user } = useAuthContext();
  const username = user.username;

  const [allRequests, setallRequests] = useState([]);
  const [forwardRequests, setForwardRequests] = useState([]); //for forward modal
  const [teachers, setTeachers] = useState([]);

  const [selectedTeachers, setSelectedTeachers] = useState([]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [inputValue, setInputValue] = useState(""); //for accept+reject
  const [showModal, setShowModal] = useState(false);
  const [showModalForward, setShowModalForward] = useState(false);

  const [rejection, setRejection] = useState(false);

  //   const [req_id, setreq_id] = useState(0);
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
      const updatedRequests = allRequests.filter(
        (request) => request.req_id !== req_id
      );
      // Set the filtered list as the new value of allRequests
      setallRequests(updatedRequests);
    }

    setSelectedRequest(null);
    setShowModal(false);
    setInputValue("");
    setRejection(false);
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
      const updatedRequests = allRequests.filter(
        (request) => request.req_id !== req_id
      );
      // Set the filtered list as the new value of allRequests
      setallRequests(updatedRequests);
      setRejection(false);
    }

    setSelectedRequest(null);
    setShowModal(false);
    setInputValue("");
    setRejection(false);
  };

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

  const handleDelete = async (req_id) => {
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

  const handleForward = async (req_id) => {
    //forward request
    setSelectedTeachers([]);

    const response = await fetch(
      `/api/request/forwardrequest/${req_id}/${user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJSON = await response.json();

    if (response.ok) {
      setShowModalForward(true);
      setForwardRequests(responseJSON);
    }
  };

  const handleModalForward = async () => {
    setShowModalForward(false);

    const req_id = selectedRequest.req_id;

    const response = await fetch(`/api/request/selectsupervisors/${req_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ supervisors: selectedTeachers }),
    });
    const responseJSON = await response.json();

    if (response.ok) {
      setallRequests(responseJSON);
    }
    setSelectedTeachers([]);
    setSelectedRequest(null);
  };

  const handleCheckbox = (teacherId, isChecked) => {
    if (isChecked) {
      setSelectedTeachers((prevTeachers) => [...prevTeachers, teacherId]);
    } else {
      setSelectedTeachers((prevTeachers) =>
        prevTeachers.filter((id) => id !== teacherId)
      );
    }
  };

  const handleForwardCancel = async () => {
    setShowModalForward(false);

    const req_id = selectedRequest.req_id;
    const username = user.username;

    const response = await fetch(
      `/api/request/cancelforwardrequest/${req_id}/${username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJSON = await response.json();

    if (response.ok) {
      setallRequests(responseJSON);
    }
    setSelectedTeachers([]);
    setSelectedRequest(null);
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

    const fetchTeacher = async () => {
      try {
        const response = await fetch(`/api/request/getsupervisors/${username}`);
        const json = await response.json();

        if (response.ok) {
          setTeachers(json);
        }

        console.log("teacher");
        console.log(json);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRequests();
    fetchTeacher();
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
          allRequests
            .filter(
              (request) =>
                request.status_name !== "Accepted" &&
                request.status_name !== "Rejected"
            )
            .map((request) => (
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
                      request.status_name ===
                        "Waiting for Supervisor approval" || request.permit > 1
                        ? "disabled:opacity-50 disabled:cursor-not-allowed"
                        : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
                    } `}
                    disabled={
                      request.status_name ===
                        "Waiting for Supervisor approval" || request.permit > 1
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
                      handleDelete(request.req_id);
                      setRejection(true);
                    }}
                    className={`group bg-pinky flex items-center gap-1 font-medium py-1.5 px-2.5 rounded-full
                    shadow-lg  h-fit justify-center md:w-[105px] md:bg-transparent  md:shadow-none 
                    ${
                      request.status_name ===
                        "Waiting for Supervisor approval" || request.permit > 1
                        ? "disabled:opacity-50 disabled:cursor-not-allowed"
                        : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
                    } `}
                    disabled={
                      request.status_name ===
                        "Waiting for Supervisor approval" || request.permit > 1
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
                    className={`group bg-blue-600 flex items-center gap-1 font-medium py-1.5 px-2.5 rounded-full
                    shadow-lg  h-fit justify-center md:w-[105px] md:bg-transparent  md:shadow-none 
                    ${
                      request.permit <= 1 ||
                      request.status_name === "Waiting for Supervisor approval"
                        ? "disabled:opacity-50 disabled:cursor-not-allowed"
                        : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
                    } `}
                    disabled={
                      request.permit <= 1 ||
                      request.status_name === "Waiting for Supervisor approval"
                    }
                  >
                    <div className={`font-bold text-white md:text-blue-600`}>
                      {React.createElement(FaSortAmountUp, { size: "15" })}
                    </div>

                    <h2
                      className={`whitespace-pre duration-300 text-sm uppercase text-white md:text-blue-600  md:block hidden`}
                    >
                      forward
                    </h2>

                    <h2
                      className={`
                  absolute bg-myBG whitespace-pre text-sm uppercase
                  text-blue-600 rounded-xl drop-shadow-lg px-0 py-0 w-0 overflow-hidden
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
                    className="text-white bg-green-600 border-0 py-1 sm:px-4 px-2 focus:outline-none hover:bg-green-700 rounded-lg text-base"
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-pinky border-0 sm:px-4 px-2 py-1 focus:outline-none hover:bg-primary rounded-lg text-base"
                    onClick={() => handleOk()}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* forward modal */}

        {showModalForward && (
          <div className="fixed w-full bg-black bg-opacity-50 top-0 left-0 z-30">
            <div className="flex items-center justify-center min-h-screen  sm:block sm:p-0">
              {/* ...rest of the modal code... */}
              <div className="bg-white ml-[35vw] rounded-lg text-left overflow-hidden sm:mt-[20vh] sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ml-5 flex flex-col items-center justify-center">
                  <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-start">
                    ~~~ Lab Supervisors ~~~
                  </h3>
                  <h4 className="mb-4 font-semibold text-gray-900 dark:text-white text-start">
                    ( At least select one supervisor )
                  </h4>

                  <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {teachers.map((teacher, index) => (
                      <li
                        key={index}
                        className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                      >
                        <div className="flex items-center ps-3">
                          <input
                            id={`${teacher.first_name}-${teacher.last_name}-checkbox`}
                            type="checkbox"
                            value=""
                            onChange={(e) =>
                              handleCheckbox(teacher.user_id, e.target.checked)
                            }
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor={`${teacher.first_name}-${teacher.last_name}-checkbox`}
                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {teacher.first_name} {teacher.last_name}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex justify-center gap-12 ">
                  <button
                    onClick={() => {
                      setShowModalForward(false);
                      handleForwardCancel();
                    }}
                    // onClick={() => handleUpdate(selectedEquipment)}
                    className="text-white bg-green-600 border-0 py-1 sm:px-4 px-2 focus:outline-none hover:bg-green-700 rounded-lg text-base"
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-pinky border-0 sm:px-4 px-2 py-1 focus:outline-none hover:bg-primary rounded-lg text-base"
                    onClick={handleModalForward}
                  >
                    Forward
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
