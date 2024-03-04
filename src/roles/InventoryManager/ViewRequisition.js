import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

import { format } from "date-fns";

import { MdCheckBox, MdEditSquare } from "react-icons/md";
import { FaSquareXmark } from "react-icons/fa6";
import { FaSortAmountUp } from "react-icons/fa";

export function ViewRequisition(params) {
  const { user } = useAuthContext();
  const username = user.username;

  const [allRequests, setallRequests] = useState([]); // all requests fetch from db

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [quantity, setQuantity] = useState(0);

  const handleAccept = async (req) => {
    //accept request
    const response = await fetch(
      `/api/requisition/approverequisition/${user.username}/${req.requisition_id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJSON = await response.json();

    if (response.ok) {
      setallRequests(
        allRequests.map((request) =>
          request.requisition_id === req.requisition_id
            ? { ...request, status_name: "Collect from Inventory" }
            : request
        )
      );
    }
  };
  const handleReject = async (req) => {
    //reject request
    const response = await fetch(
      `/api/requisition/rejectrequisition/${user.username}/${req.requisition_id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseJSON = await response.json();

    if (response.ok) {
      setallRequests(
        allRequests.map((request) =>
          request.requisition_id === req.requisition_id
            ? { ...request, status_name: "Rejected" }
            : request
        )
      );
    }
  };

  const handleFinal = async (req) => {
    //reject request
    const response = await fetch(
      `/api/equipments/equipment/${req.equipment_name}/${username}/`
    );
    const responseJSON = await response.json();

    console.log("knoooooooooooo vai");
    console.log(responseJSON);

    if (response.ok) {
      setShowModal(true);
      setModalContent({
        prev_quantity: req.quantity,
        ...responseJSON,
        id: req.requisition_id,
      });
    }
  };

  const handleOk = async () => {
    const response = await fetch(
      `/api/requisition/fulfilrequisition/${user.username}/${modalContent.id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: quantity }),
      }
    );

    const responseJSON = await response.json();

    if (response.ok) {
      setallRequests(
        allRequests.map((request) =>
          request.requisition_id === modalContent.id
            ? { ...request, status_name: "Fulfilled" }
            : request
        )
      );

      setShowModal(false);
      setModalContent({});
      setQuantity(0);
    }
  };

  const handleCancel = async () => {
    setShowModal(false);
    setModalContent({});
    setQuantity(0);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          `/api/requisition/viewrequisitionsinventorymanager/${username}`
        );
        const json = await response.json();

        console.log("paisis");
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
    <div className="flex flex-col w-full p-5 border gap-10 min-h-screen">
      <div className="flex flex-col justify-start items-start gap-5 mt-7 mr-5"></div>

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
                  Location:{" "}
                  <span className="text-myText font-bold">
                    &nbsp;{request.location_name}
                  </span>
                </span>
                <span className="text-gray-500">
                  Quantity:{" "}
                  <span className="text-myText font-bold">
                    &nbsp;{request.quantity}
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
                    {format(new Date(request.req_date), "dd/MM/yyyy")}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex md:flex-row flex-col gap-3 md:gap-0">
              <button
                onClick={() => {
                  handleAccept(request);
                }}
                className={`group bg-green-700 flex items-center gap-1 font-medium py-1.5 px-2.5 rounded-full
                    shadow-lg  h-fit justify-center md:w-[105px] md:bg-transparent  md:shadow-none
                    ${
                      request.status_name === "Collect from Inventory" ||
                      request.status_name === "Rejected" ||
                      request.status_name === "Fulfilled"
                        ? "disabled:opacity-50 disabled:cursor-not-allowed"
                        : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
                    }
                    `}
                disabled={
                  request.status_name === "Collect from Inventory" ||
                  request.status_name === "Rejected" ||
                  request.status_name === "Fulfilled"
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
                      request.status_name === "Collect from Inventory" ||
                      request.status_name === "Rejected" ||
                      request.status_name === "Fulfilled"
                        ? "disabled:opacity-50 disabled:cursor-not-allowed"
                        : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
                    }
                    `}
                disabled={
                  request.status_name === "Collect from Inventory" ||
                  request.status_name === "Rejected" ||
                  request.status_name === "Fulfilled"
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
                  handleFinal(request);
                }}
                className={`group bg-gray-700 flex items-center gap-1 font-medium py-1.5 px-2.5 rounded-full
              shadow-lg  h-fit justify-center md:w-[105px] md:bg-transparent  md:shadow-none 
              ${
                request.status_name === "Pending" ||
                request.status_name === "Rejected" ||
                request.status_name === "Fulfilled"
                  ? "disabled:opacity-50 disabled:cursor-not-allowed"
                  : "hover:shadow-xl hover:scale-95  active:scale-105 active:shadow-xl md:hover:scale-105 md:hover:shadow-none md:active:scale-95"
              }
              `}
                disabled={
                  request.status_name === "Pending" ||
                  request.status_name === "Rejected" ||
                  request.status_name === "Fulfilled"
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
            <div className="bg-white ml-[35vw] rounded-lg text-left overflow-hidden sm:mt-[20vh] sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-myBG px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:flex-col fle items-stretch">
                  <div className="my-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-grow">
                    <div className="mt-4"></div>
                    <div className="mt-4">
                      <h5 className="text-base leading-6 font-medium text-myText">
                        Requested Quantity: {modalContent.prev_quantity}
                      </h5>
                    </div>
                    <div className="mt-4">
                      <h5 className="text-base leading-6 font-medium text-myText">
                        Available: {modalContent.available}
                      </h5>
                    </div>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex gap-4">
                    <h3 className="text-base leading-6 font-medium text-myText">
                      Alloted Quantity
                    </h3>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-24 p-1 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-pinky focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex justify-center gap-12 ">
                <button
                  onClick={() => handleCancel()}
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
