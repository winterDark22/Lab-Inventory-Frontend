import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

import { format } from "date-fns";

import { MdCheckBox, MdEditSquare } from "react-icons/md";
import { FaSquareXmark } from "react-icons/fa6";
import { FaSortAmountUp } from "react-icons/fa";

export function ViewRequests(params) {
  const { user } = useAuthContext();
  const username = user.username;

  const [allRequests, setallRequests] = useState([]); // all requests fetch from db
  const [filter, setFilter] = useState("Pending"); // filter requests by status

  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("Equipment name");
  const [searchDate, setSearchDate] = useState("");


  const handleDateSearch = (event) => {
    setSearchDate(event.target.value);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
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
      setallRequests(
        allRequests.map((request) =>
          request.req_id === req_id
            ? { ...request, status_name: "Accepted" }
            : request
        )
      );
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
      setallRequests(
        allRequests.map((request) =>
          request.req_id === req_id
            ? { ...request, status_name: "Rejected" }
            : request
        )
      );
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`/api/request/showrequests/${username}`);
        const json = await response.json();

        console.log("ekhane ljflkjd");
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

  const filteredRequestsByStatus = allRequests.filter((request) => {
    if (filter === "All") return true;
    if (filter === "Pending")
      return (
        request.status_name !== "Accepted" && request.status_name !== "Rejected"
      );
    return request.status_name === filter;
  });

  const filteredRequests = filteredRequestsByStatus.filter((request) => {
    let matchesSearchTerm = true;
    switch (searchType) {
      case "Equipment name":
        matchesSearchTerm = request.equipment_name
          ? request.equipment_name
            .toLowerCase()
            .startsWith(searchTerm.toLowerCase())
          : false;
        break;
      case "Lab assistant name":
        matchesSearchTerm = request.username
          ? request.username.toLowerCase().startsWith(searchTerm.toLowerCase())
          : false;
        break;
      default:
      // Add more cases as needed
    }

    let matchesSearchDate = true;
    if (searchDate) {
      const recordDate = new Date(request.req_time);
      const searchDateObj = new Date(searchDate);
      matchesSearchDate =
        recordDate.getFullYear() === searchDateObj.getFullYear() &&
        recordDate.getMonth() === searchDateObj.getMonth() &&
        recordDate.getDate() === searchDateObj.getDate();
    }
    return matchesSearchTerm && matchesSearchDate;
  });

  return (
    <div className="flex flex-col w-full p-5 border gap-10 min-h-screen">
      
        <div className="flex items-center justify-between ">
          <div className="flex justify-between gap-4">
            <button
              onClick={() => setFilter("Pending")}
              className={`hover:text-primary text-xs uppercase p-3 w-24 rounded-lg text-gray-600 bg-myCard  active:text-myText ${filter === "Pending" && "text-primary"}`}
            >
              {" "}
              Pending
            </button>
            <button
              onClick={() => setFilter("Accepted")}
              className={`hover:text-primary text-xs uppercase p-3 w-24 rounded-lg text-gray-600 bg-myCard  active:text-myText ${filter === "Accepted" && "text-primary"}`}
            >
              {" "}
              Accepted
            </button>
            <button
              onClick={() => setFilter("Rejected")}
              className={`hover:text-primary text-xs uppercase p-3 w-24 rounded-lg text-gray-600 bg-myCard  active:text-myText ${filter === "Rejected" && "text-primary"}`}
            >
              {" "}
              Rejected
            </button>
            <button
              onClick={() => setFilter("All")}
              className={`hover:text-primary text-xs uppercase p-3 w-24 rounded-lg text-gray-600 bg-myCard  active:text-myText ${filter === "All" && "text-primary"}`}
            >
              {" "}
              All
            </button>
          </div>
          <div className="flex justify-between items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            className="border border-pinky bg-myBG rounded-lg text-myText text-sm placeholder:text-bg-gray-500 w-full p-2.5 focus:ring-1 focus:ring-pinky focus:outline-none focus:shadow-inner"
            />

            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="border border-pinky bg-myBG rounded-lg text-myText text-sm placeholder:text-bg-gray-500 w-full p-2.5 focus:ring-1 focus:ring-pinky focus:outline-none focus:shadow-inner"
            >
              <option value="Equipment name">Equipment name</option>
              <option value="Lab assistant name">Lab assistant name</option>
              {/* Add more options as needed */}
            </select>

            <input
              type="date"
              value={searchDate}
              onChange={handleDateSearch}
              className="border border-pinky bg-myBG rounded-lg text-myText text-sm placeholder:text-bg-gray-500 w-full p-2.5  focus:ring-1 focus:ring-pinky focus:outline-none focus:shadow-inner"
            />
          </div>
        </div>
      

      {filteredRequests &&
        filteredRequests.map((request) => (
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
              ${request.status_name === "Accepted" ||
                    request.status_name === "Rejected"
                    ? "disabled:opacity-50 disabled:cursor-not-allowed"
                    : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
                  }
              `}
                disabled={
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
                  handleReject(request.req_id);
                }}
                className={`group bg-pinky flex items-center gap-1 font-medium py-1.5 px-2.5 rounded-full
              shadow-lg  h-fit justify-center md:w-[105px] md:bg-transparent  md:shadow-none 
              ${request.status_name === "Accepted" ||
                    request.status_name === "Rejected"
                    ? "disabled:opacity-50 disabled:cursor-not-allowed"
                    : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
                  }
              `}
                disabled={
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
            </div>
          </div>
        ))}
    </div>
  );
}
