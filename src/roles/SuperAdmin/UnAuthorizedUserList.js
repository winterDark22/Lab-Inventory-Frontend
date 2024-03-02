import { useEffect, useState } from "react";
import React from "react";
import { MdCheckBox, MdEditSquare } from "react-icons/md";
import { FaSquareXmark } from "react-icons/fa6";
import { FaSortAmountUp } from "react-icons/fa";

import { useAuthContext } from "../../context/AuthContext";

export function UnAthorizedUserList(params) {
    const { user } = useAuthContext();
    const [unauthorizedUsers, setUnauthorizedUsers] = useState([]);

    const handleAccept = async (user) => {
        //SET THE URL HERE  FOR ACCEPTING
        const response = await fetch(`/api/adminjobs/acceptuser/${user.user_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user.user_id,
            }),
        });

        if (response.ok) {
            setUnauthorizedUsers(
                unauthorizedUsers.filter((u) => u.user_id !== user.user_id)
            );
        }
    };

    const handleReject = async (user) => {
        //SET THE URL HERE  FOR Rejecting
        const response = await fetch(`/api/adminjobs/acceptuser/${user.user_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user.user_id,
            }),
        });

        if (response.ok) {
            setUnauthorizedUsers(
                unauthorizedUsers.filter((u) => u.user_id !== user.user_id)
            );
        }
    };

    //   useEffect(() => {
    //     const fetchUsers = async () => {
    //       try {
    //         const response = await fetch("/api/adminjobs/showusers");
    //         const json = await response.json();

    //         if (response.ok) {
    //           setallUsers(json);
    //         }
    //       } catch (error) {
    //         console.log(error.message);
    //       }
    //     };
    //     fetchUsers();
    //   }, []);

    return (
        <div className="flex flex-col w-full p-5 border gap-10 min-h-screen">
            <div className="flex flex-col justify-start items-start gap-5 mt-7 mr-5">
                <div className="flex items-center justify-between gap-4 "></div>
            </div>

            {unauthorizedUsers &&
                unauthorizedUsers.map((request) => (
                    <div className="w-full p-5 rounded-xl shadow-xl flex justify-between bg-myCard ">
                        <div>
                            <h2 className=" text-myText text-left font-bold">
                                {" "}
                                {request.username}
                            </h2>
                            <div className="mt-4 text-sm flex flex-col text-left">
                                <span className="text-gray-500">
                                    Firstname:{" "}
                                    <span className="text-myText font-bold">
                                        &nbsp;{request.username}
                                    </span>
                                </span>
                                <span className="text-gray-500">
                                    Lastname:{" "}
                                    <span className="text-myText font-bold">
                                        &nbsp;{request.username}
                                    </span>
                                </span>

                                <span className="text-gray-500">
                                    Role:{" "}
                                    <span className="text-myText font-bold">
                                        &nbsp;{request.quantity}
                                    </span>
                                </span>

                                <span className="text-gray-500">
                                    Email:{" "}
                                    <span className="text-myText font-bold">
                                        &nbsp;{request.email}
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
                                    aceept
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
