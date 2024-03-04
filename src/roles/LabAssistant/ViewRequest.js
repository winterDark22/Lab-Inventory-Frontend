// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { format } from "date-fns";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

import { MdCheckBox, MdEditSquare } from "react-icons/md";
import { FaSquareXmark } from "react-icons/fa6";
import { FaSortAmountUp } from "react-icons/fa";

import { useLocation } from "react-router-dom";
import { useNotificationContext } from "../../context/NotificationContext";

export function ViewRequest() {
  const { user } = useAuthContext();
  const username = user.username;

  const location = useLocation();
  const notification = location.state ? location.state.notification : null;
  const { setNewNotificationCnt } = useNotificationContext();
  const [seconds, setSeconds] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("Equipment name");

  //Mother of all requests
  const [allRequests, setallRequests] = useState([]);
  //filter requests by status
  const [filter, setFilter] = useState("All");

  const [forwardRequests, setForwardRequests] = useState([]); //for forward modal
  const [teachers, setTeachers] = useState([]);

  const [selectedTeachers, setSelectedTeachers] = useState([]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [inputValue, setInputValue] = useState(""); //for accept+reject
  const [showModal, setShowModal] = useState(false);
  const [showModalForward, setShowModalForward] = useState(false);

  const [rejection, setRejection] = useState(false);

  const [searchDate, setSearchDate] = useState("");
  const [isDatePickerOpen, setDatePickerOpen] = useState(null);

  const [buttonState, setButtonState] = useState({});

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  //related to setting due date
  const setDate = (event) => {
    setSearchDate(event.target.value);
  };

  const setDueDate = async (req_id) => {
    const response = await fetch(`/api/due/createdue/${username}/${req_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dueDate: searchDate }),
    });

    const responseJSON = await response.json();

    // console.log(responseJSON);
    setSearchDate("");
  };
  //   const [req_id, setreq_id] = useState(0);
  const handleOk = async () => {
    // if (inputValue.trim() === "") {
    //   // Handle the situation when inputValue is an empty string
    //   if (rejection) {
    //     setInputValue(
    //       "Your request has been rejected. Please contact the lab supervisor for more details."
    //     );
    //   } else {
    //     setInputValue("Your request has accepted. Collect it from the lab");
    //   }
    // }

    let comment;

    if (inputValue.trim() === "") {
      // Handle the situation when inputValue is an empty string
      if (rejection) {
        comment =
          "Your request has been rejected. Please contact the lab supervisor for more details.";
      } else {
        comment = "Your request has accepted. Collect it from the lab";
      }
    } else {
      comment = inputValue;
    }

    const req_id = selectedRequest.req_id;

    const response = await fetch(
      `/api/request/addcomment/${req_id}/${username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: comment }),
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

  const handleCancel = async () => {
    const req_id = selectedRequest.req_id;

    setInputValue("");
    let comment;

    if (rejection) {
      comment =
        "Your request has been rejected. Please contact the lab supervisor for more details.";
    } else {
      comment = "Your request has accepted. Collect it from the lab";
    }

    const response = await fetch(
      `/api/request/addcomment/${req_id}/${username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: comment }),
      }
    );

    if (response.ok) {
      // const updatedRequests = allRequests.filter(
      //   (request) => request.req_id !== req_id
      // );

      setallRequests(
        allRequests.map((request) =>
          request.req_id === req_id
            ? { ...request, status_name: rejection ? "Rejected" : "Accepted" }
            : request
        )
      );

      // Set the filtered list as the new value of allRequests
      //setallRequests(updatedRequests);
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
    console.log(selectedTeachers);

    const req_id = selectedRequest.req_id;

    const response = await fetch(
      `/api/request/selectsupervisors/${req_id}/${user.username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ supervisors: selectedTeachers }),
      }
    );
    const responseJSON = await response.json();

    if (response.ok) {
      setallRequests(responseJSON);
    }
    setSelectedTeachers([]);
    setSelectedRequest(null);
    setForwardRequests([]);
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
        method: "PUT",
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
    setSelectedRequest([]);
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

    console.log("ekhane sob requests");
    console.log(allRequests);
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

    const fetchUnseenNotification = async () => {
      try {
        const response = await fetch(
          `/api/notification/getunseennotificationcount/${user.username}`
        );
        const json = await response.json();

        console.log(json);

        if (response.ok) {
          setNewNotificationCnt(json.unseen_notification_count);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUnseenNotification();
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
  }, []);

  const filteredRequestsByStatus = allRequests.filter((request) => {
    if (filter === "All") return true;
    if (filter === "Pending")
      return request.status_name === "Waiting for Lab Assistant approval";
    if (filter === "Accepted") return request.status_name === "Accepted";
    if (filter === "Rejected") return request.status_name === "Rejected";

    return (
      request.status_name !== "Accepted" &&
      request.status_name !== "Rejected" &&
      request.status_name !== "Waiting for Lab Assistant approval"
    );
  });

  return (
    <div className="flex flex-col w-full p-5 border gap-10 min-h-screen">
      <div className="flex flex-col justify-start items-start gap-5 mt-7 mr-5">
        <div className="flex items-center justify-between gap-4 ">
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

          <div />
        </div>

        {/* this is individual request card */}

        {/*   </div><div className="flex flex-col w-full p-5 border gap-10"> */}
        {filteredRequestsByStatus &&
          filteredRequestsByStatus
            .sort((a, b) => new Date(b.req_time) - new Date(a.req_time))
            .map((request) => {
              const isHighlighted =
                notification && request.req_id === notification.type_id;
              return (
                <div
                  className={`w-full p-5 rounded-xl shadow-xl flex justify-between bg-myCard  ${
                    isHighlighted
                      ? " bg-newNoti shadow-md p-5 duration-300"
                      : ""
                  }`}
                >
                  {" "}
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
                        setSelectedRequest(request);
                        handleAccept(request.req_id);
                      }}
                      className={`group bg-green-700 flex items-center gap-1 font-medium py-1.5 px-2.5 rounded-full
                    shadow-lg  h-fit justify-center md:w-[105px] md:bg-transparent  md:shadow-none 
                    ${
                      request.status_name === "Accepted" ||
                      request.status_name === "Rejected" ||
                      request.status_name ===
                        "Waiting for Supervisor approval" ||
                      request.status_name ===
                        "Waiting for Head of Department approval" ||
                      request.permit > 1
                        ? "disabled:opacity-50 disabled:cursor-not-allowed"
                        : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
                    } `}
                      disabled={
                        request.status_name === "Accepted" ||
                        request.status_name === "Rejected" ||
                        request.status_name ===
                          "Waiting for Supervisor approval" ||
                        request.status_name ===
                          "Waiting for Head of Department approval" ||
                        request.permit > 1
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
                      request.status_name === "Accepted" ||
                      request.status_name === "Rejected" ||
                      request.status_name ===
                        "Waiting for Supervisor approval" ||
                      request.status_name ===
                        "Waiting for Head of Department approval" ||
                      request.permit > 1
                        ? "disabled:opacity-50 disabled:cursor-not-allowed"
                        : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
                    } `}
                      disabled={
                        request.status_name === "Accepted" ||
                        request.status_name === "Rejected" ||
                        request.status_name ===
                          "Waiting for Supervisor approval" ||
                        request.status_name ===
                          "Waiting for Head of Department approval" ||
                        request.permit > 1
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
                      request.status_name === "Accepted" ||
                      request.status_name === "Rejected" ||
                      request.status_name ===
                        "Waiting for Supervisor approval" ||
                      request.status_name ===
                        "Waiting for Head of Department approval"
                        ? "disabled:opacity-50 disabled:cursor-not-allowed"
                        : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
                    } `}
                      disabled={
                        request.permit <= 1 ||
                        request.status_name === "Accepted" ||
                        request.status_name === "Rejected" ||
                        request.status_name ===
                          "Waiting for Supervisor approval" ||
                        request.status_name ===
                          "Waiting for Head of Department approval"
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

                    <button
                      onClick={() => {
                        if (
                          !buttonState[request.req_id] ||
                          buttonState[request.req_id] === "Select Date"
                        ) {
                          setDatePickerOpen(request.req_id);
                          setButtonState((prevState) => ({
                            ...prevState,
                            [request.req_id]: "Add Due",
                          }));

                          // action
                        } else if (buttonState[request.req_id] === "Add Due") {
                          setDatePickerOpen(null);
                          setButtonState((prevState) => ({
                            ...prevState,
                            [request.req_id]: "Select Date",
                          }));
                          setDueDate(request.req_id);
                        }
                        // handle your action here
                      }}
                      className={`group bg-black flex items-center gap-1 font-medium py-1.5 px-2.5 rounded-full
                  shadow-lg  h-fit justify-center md:w-[105px] md:bg-transparent  md:shadow-none 
                  ${
                    request.status_name !== "Accepted"
                      ? "hidden"
                      : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
                  } `}
                    >
                      <div className={`font-bold text-white md:text-black`}>
                        {React.createElement(FaSortAmountUp, { size: "15" })}
                      </div>

                      <h2
                        className={`whitespace-pre duration-300 text-sm uppercase text-white md:text-black  md:block hidden`}
                      >
                        {buttonState[request.req_id] || "Select Date"}
                      </h2>

                      <h2
                        className={`
                            absolute bg-myBG whitespace-pre text-sm uppercase
                            text-black rounded-xl drop-shadow-lg px-0 py-0 w-0 overflow-hidden
                            group-hover:px-2.5 group-hover:py-1.5 group-hover:-left-24 group-hover:duration-200 group-hover:w-fit
                            md:hidden
                            `}
                      >
                        {buttonState[request.req_id] || "Select Date"}
                      </h2>
                    </button>

                    {isDatePickerOpen === request.req_id &&
                      request.status_name === "Accepted" && (
                        <input
                          type="date"
                          value={searchDate}
                          onChange={(event) => {
                            setDate(event);

                            setButtonState((prevState) => ({
                              ...prevState,
                              [request.req_id]: "Add Due",
                            }));
                          }}
                          className="ml-4 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        />
                      )}
                  </div>
                </div>
              );
            })}

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
                    className="text-white bg-pinky border-0 sm:px-4 px-2 py-1 focus:outline-none hover:bg-primary rounded-lg text-base"
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-green-600 border-0 py-1 sm:px-4 px-2 focus:outline-none hover:bg-green-700 rounded-lg text-base"
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
