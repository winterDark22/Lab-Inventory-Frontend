import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { format } from "date-fns";
import { differenceInDays } from "date-fns";

import { useLocation } from "react-router-dom";
import { useNotificationContext } from "../../context/NotificationContext";

export function LabEquipmentRequests(params) {
  const { user } = useAuthContext();

  const location = useLocation();
  const notification = location.state ? location.state.notification : null;
  const { setNewNotificationCnt } = useNotificationContext();
  const [seconds, setSeconds] = useState(0);

  const [seacrchByUser, setSeacrchByUser] = useState("");

  const [allRequests, setAllRequests] = useState([]);

  useEffect(() => {
    const fetchDues = async () => {
      try {
        const response = await fetch(`/api/adminjobs/showrequests/`);

        const json = await response.json();
        console.log("herenaaaaaaaaaaaaaaaauuuuut");
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

    fetchDues();
    fetchUnseenNotification();
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
  }, []);

  return (
    <div className="border border-pinky my-2 min-h-screen rounded-2xl ">
      <div className="flex justify-between">
        <h2 className="text-left text-myText mt-7 ml-5 text-2xl font-bold">
          All Requests
        </h2>
        <div className="flex "></div>
      </div>

      <div className="relative overflow-x-auto sm:rounded-xl m-5 ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-primary">
            <tr className="border-b-[6px] border-myBG">
              <th scope="col" className="px-6 py-3 text-center">
                Equipment
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Requester
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Date
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Verdictor
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {allRequests &&
              allRequests.map((equipment, index) => (
                <tr className="bg-myCard border-b-8 border-myBG text-myText">
                  <td className="px-6 py-4 font-semibold text-center text-base">
                    {equipment.equipment_name}
                    <p className="text-sm text-gray-500">
                      {equipment.location_name}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-semibold  text-center text-base">
                    {equipment.username}
                  </td>

                  <td className="px-6 py-4 font-semibold  text-center text-base">
                    {equipment.quantity}
                  </td>
                  <td className="px-6 py-4 font-semibold  text-center text-base">
                    {format(new Date(equipment.req_time), "dd/MM/yyyy")}
                  </td>

                  <td className="px-6 py-4 font-semibold  text-center text-base">
                    {equipment.verdictor}
                    <p className="text-sm text-gray-500">
                      {equipment.verdictor_role}
                    </p>
                  </td>

                  <td className="px-6 py-4 font-semibold  text-center text-base">
                    {equipment.status_name}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
