import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

import { format } from "date-fns";

import { MdCheckBox, MdEditSquare } from "react-icons/md";
import { FaSquareXmark } from "react-icons/fa6";
import { FaSortAmountUp } from "react-icons/fa";

export function ClearanceRequests(params) {
  const { user } = useAuthContext();
  const username = user.username;

  const [allRequests, setAllRequests] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleAccept = async (req) => {
    const response = await fetch(
      `/api/due/acceptclearance/${username}/${req.clearance_req_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    if (response.ok) {
      setAllRequests(
        allRequests.map((request) => {
          if (request.clearance_req_id === req.clearance_req_id) {
            return {
              ...request,
              status_name: "Waiting for Department Head Signature",
            };
          }
          return request;
        })
      );
    }
  };

  const handleReject = async (req) => {
    const response = await fetch(
      `/api/due/rejectclearance/${username}/${req.clearance_req_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    if (response.ok) {
      setAllRequests(
        allRequests.map((request) => {
          if (request.clearance_req_id === req.clearance_req_id) {
            return {
              ...request,
              status_name: "Rejected",
            };
          }
          return request;
        })
      );
    }
  };

  const handleSigned = async (req) => {
    const response = await fetch(
      `/api/due/finalcallforclearance/${username}/${req.clearance_req_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    //"Ready to collect
    const json = await response.json();
    if (response.ok) {
      setAllRequests(
        allRequests.map((request) => {
          if (request.clearance_req_id === req.clearance_req_id) {
            return {
              ...request,
              status_name: "Ready to collect",
            };
          }
          return request;
        })
      );
    }
  };

  const handleCheck = async (req) => {
    try {
      const response = await fetch(
        `/api/due/checkclearanceeligibility/${req.username}`
      );

      const json = await response.json();

      console.log("cleraed done");
      console.log(json);

      if (json.dues.length === 0 && json.monetary_dues.length === 0) {
        setModalContent("The student is eligible for clearance");
      } else {
        setModalContent("The student has dues to clear");
      }

      if (response.ok) {
        setShowModal(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setModalContent("");
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/due/checkclearancerequests");
        const json = await response.json();

        console.log("ekhane ljflkjd");
        console.log(json);
        if (response.ok) {
          setAllRequests(json);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="flex flex-col w-full p-5 border gap-10 min-h-screen">
      <div className="flex flex-col justify-start items-start gap-5 mt-7 mr-5">
        <div className="flex items-center justify-between gap-4 ">
          {/* <button
                onClick={() => setFilter("Pending")}
                className={`hover:text-primary text-xs uppercase p-3 w-24 rounded-lg text-gray-600 bg-myCard  active:text-myText focus:text-primary`}
              >
                {" "}
                Pending
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
              </button> */}

          {/* <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className={`text-myText text-xs uppercase p-3 rounded-lg hover:text-gray-400 bg-myCard  focus:outline-none`}
            placeholder="Category"
          >
            <option selected>all Category</option>
            <option>user name</option>
            <option>equipment</option>
          </select> */}

          {/* <div class="relative ">
            <input
              datepicker
              type="date"
              value={searchDate}
              onChange={handleDateSearch}
              class="bg-myCard text-myText text-xs uppercase rounded-lg  block  p-3"
              placeholder="Select date"
            />
          </div> */}

          {/* <div className="relative flex w-full gap-2 md:w-max">
            <div className="relative h-10 w-full min-w-[288px] ">
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearch}
                className={`peer h-full w-full rounded-[7px] border border-primary  bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal  !text-myText outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 focus:shadow-2xl 
                      ${
                        searchTerm === ""
                          ? "border-t-primary"
                          : "border-t-transparent"
                      }`}
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-myText  transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-primary before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-primary after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary  peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Type here...
              </label>
            </div>

            <button
              className="!absolute right-1 top-1 select-none rounded-full hover:bg-myCard py-2 px-2 text-center align-middle font-sans text-xs font-bold uppercase text-myText transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
            >
              <div className={`font-bold `}>
                {React.createElement(IoSearch, { size: "17" })}
              </div>
            </button>
          </div> */}
          {/* <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="ml-4 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          />

          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          >
            <option value="Equipment name">Equipment name</option>
            <option value="Lab assistant name">Lab assistant name</option>
            
          </select>

          <input
            type="date"
            value={searchDate}
            onChange={handleDateSearch}
            className="ml-4 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          /> */}
        </div>
      </div>

      {allRequests &&
        allRequests.map((request) => (
          <div className="w-full p-5 rounded-xl shadow-xl flex justify-between bg-myCard ">
            <div>
              <div className="mt-4 text-sm flex flex-col text-left">
                <span className="text-gray-500">
                  Student ID:{" "}
                  <span className="text-myText font-bold">
                    &nbsp;{request.username}
                  </span>
                </span>

                <span className="text-gray-500">
                  Level-Term:{" "}
                  <span className="text-myText font-bold">
                    &nbsp;{request.level}-{request.term}
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
                    {format(new Date(request.request_date), "dd/MM/yyyy")}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex md:flex-row flex-col gap-3 md:gap-0">
              <button
                onClick={() => {
                  handleCheck(request);
                }}
                className={`group bg-green-700 flex items-center gap-1 font-medium py-1.5 px-2.5 rounded-full
              shadow-lg  h-fit justify-center md:w-[105px] md:bg-transparent  md:shadow-none 
              ${
                request.status_name === "Accepted" ||
                request.status_name === "Rejected"
                  ? "disabled:opacity-50 disabled:cursor-not-allowed"
                  : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
              }
              `}
                // disabled={
                //   request.status_name === "Accepted" ||
                //   request.status_name === "Rejected"
                // }
              >
                <div className={`font-bold text-white md:text-green-700`}>
                  {React.createElement(MdCheckBox, { size: "16" })}
                </div>

                <h2
                  className={`whitespace-pre duration-300 text-sm uppercase text-white md:text-green-700 md:block hidden`}
                >
                  Check Eligibility
                </h2>

                <h2
                  className={`
            absolute bg-myBG whitespace-pre text-sm uppercase
            text-green-700 rounded-xl drop-shadow-lg px-0 py-0 w-0 overflow-hidden
            group-hover:px-2.5 group-hover:py-1.5 group-hover:-left-20 group-hover:duration-200 group-hover:w-fit
            md:hidden
            `}
                >
                  Check Eligibility
                </h2>
              </button>

              <button
                onClick={() => {
                  handleAccept(request);
                }}
                className={`group bg-green-700 flex items-center gap-1 font-medium py-1.5 px-2.5 rounded-full
              shadow-lg  h-fit justify-center md:w-[105px] md:bg-transparent  md:shadow-none 
              ${
                request.status_name ===
                  "Waiting for Department Head Signature" ||
                request.status_name === "Rejected" ||
                request.status_name === "Ready to collect"
                  ? "disabled:opacity-50 disabled:cursor-not-allowed"
                  : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
              }
              `}
                disabled={
                  request.status_name ===
                    "Waiting for Department Head Signature" ||
                  request.status_name === "Rejected" ||
                  request.status_name === "Ready to collect"
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
                  handleReject(request);
                }}
                className={`group bg-pinky flex items-center gap-1 font-medium py-1.5 px-2.5 rounded-full
              shadow-lg  h-fit justify-center md:w-[105px] md:bg-transparent  md:shadow-none 
              ${
                request.status_name ===
                  "Waiting for Department Head Signature" ||
                request.status_name === "Rejected" ||
                request.status_name === "Ready to collect"
                  ? "disabled:opacity-50 disabled:cursor-not-allowed"
                  : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
              }
              `}
                disabled={
                  request.status_name ===
                    "Waiting for Department Head Signature" ||
                  request.status_name === "Rejected" ||
                  request.status_name === "Ready to collect"
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
                  handleSigned(request);
                }}
                className={`group bg-gray-700 flex items-center gap-1 font-medium py-1.5 px-2.5 rounded-full
              shadow-lg  h-fit justify-center md:w-[105px] md:bg-transparent  md:shadow-none 
              ${
                request.status_name === "Rejected" ||
                request.status_name === "Ready to collect" ||
                request.status_name === "Waiting for Superadmin Approval"
                  ? "disabled:opacity-50 disabled:cursor-not-allowed"
                  : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
              }
              `}
                disabled={
                  request.status_name === "Rejected" ||
                  request.status_name === "Ready to collect" ||
                  request.status_name === "Waiting for Superadmin Approval"
                }
              >
                <div className={`font-bold text-white md:text-gray-700`}>
                  {React.createElement(FaSortAmountUp, { size: "15" })}
                </div>

                <h2
                  className={`whitespace-pre duration-300 text-sm uppercase text-white  md:text-gray-700 md:block hidden`}
                >
                  final
                </h2>

                <h2
                  className={`
            absolute bg-myBG whitespace-pre text-sm uppercase
            text-gray-700 rounded-xl drop-shadow-lg px-0 py-0 w-0 overflow-hidden
            group-hover:px-2.5 group-hover:py-1.5 group-hover:-left-20 group-hover:duration-200 group-hover:w-fit
            md:hidden
            `}
                >
                  final
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
                <div className="sm:flex sm:flex-col fle items-stretch">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-grow">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {modalContent}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex justify-center gap-12 ">
                <button
                  onClick={() => handleModalCancel()}
                  className="text-white bg-pinky  border-0 py-1 sm:px-4 px-2 focus:outline-none hover:bg-primary rounded-lg text-base"
                >
                  Cancel
                </button>
                {/* <button
                    className="text-white  bg-green-600 border-0 sm:px-4 px-2 py-1 focus:outline-none  hover:bg-green-700 rounded-lg text-base"
                    onClick={() => handleSend()}
                  >
                    Send
                  </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
