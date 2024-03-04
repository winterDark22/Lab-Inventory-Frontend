import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

import { format } from "date-fns";

import { useLocation } from "react-router-dom";
import { useNotificationContext } from "../../context/NotificationContext";

export function ViewRequisition(params) {
  const { user } = useAuthContext();

  const [allRequests, setAllRequests] = useState([]);

  const location = useLocation();
  const notification = location.state ? location.state.notification : null;
  const { setNewNotificationCnt } = useNotificationContext();
  const [seconds, setSeconds] = useState(0);

  let hashMap = new Map();
  hashMap.set("pending", "blue-600");
  hashMap.set("collect from inventory", "green-600");
  hashMap.set("fulfilled", "green-600");
  hashMap.set("rejected", "pinky");

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch(
          `/api/requisition/viewrequisitionslabassistant/${user.username}`
        );

        const json = await response.json();

        console.log("requisition log");
        console.log(json);

        if (response.ok) {
          setAllRequests(json);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

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

    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    fetchEquipments();
    fetchUnseenNotification();
  }, []);

  return (
    <div className=" my-2 min-h-screen rounded-2xl ">
      <div className="flex justify-between">
        <h2 className="text-left text-myText mt-7 ml-5 text-2xl font-bold"></h2>
        <div className="flex "></div>
      </div>

      <div className="relative overflow-x-auto sm:rounded-xl m-5 ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-primary">
            <tr className="border-b-[6px] border-myBG">
              <th scope="col" className="px-6 py-3 text-center">
                Equipment
              </th>

              <th scope="col" className="pl-6 py-3 text-center">
                Date
              </th>
              <th scope="col" className="pl-6 py-3 text-center">
                Quantity
              </th>
              <th scope="col" className=" py-3 text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {allRequests &&
              [...allRequests]
                .sort((a, b) => {
                  const dueDateA = new Date(a.req_date);
                  const dueDateB = new Date(b.req_date);
                  return dueDateA - dueDateB;
                })
                .map((request) => {
                  let displayText = "";
                  let colorClass = "blue-600";
                  displayText = format(
                    new Date(request.req_date),
                    "dd/MM/yyyy"
                  );

                  const isHighlighted =
                    notification &&
                    request.requisition_id === notification.type_id;

                  return (
                    <tr
                      className={`bg-myCard border-b-8 border-myBG text-myText  ${
                        isHighlighted && seconds < 0.1
                          ? " bg-newNoti shadow-md p-5 duration-300 "
                          : "duration-500 "
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold text-center text-base">
                        {" "}
                        {request.equipment_name}{" "}
                      </td>
                      <td
                        className={` py-4 text-center flex items-center justify-center`}
                      >
                        {displayText}
                      </td>
                      <td className="pl-6 py-4 font-semibold  text-center text-base">
                        {request.quantity}
                      </td>

                      <td
                        className={` py-4 text-center flex items-center justify-center`}
                      >
                        <div
                          className={` bg-${hashMap.get(
                            request.status_name.toLowerCase()
                          )} text-white w-fit px-7 py-1 rounded-lg`}
                        >
                          {request.status_name}
                        </div>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
