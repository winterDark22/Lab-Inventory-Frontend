import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { format } from "date-fns";
import { differenceInDays } from "date-fns";

import { useLocation } from "react-router-dom";
import { useNotificationContext } from "../../context/NotificationContext";

export function CheckLabEquipments(params) {
  const { user } = useAuthContext();

  const location = useLocation();
  const notification = location.state ? location.state.notification : null;
  const { setNewNotificationCnt } = useNotificationContext();
  const [seconds, setSeconds] = useState(0);

  const [seacrchByUser, setSeacrchByUser] = useState("");

  const [allEquipment, setallEquipment] = useState([]);

  useEffect(() => {
    const fetchDues = async () => {
      try {
        const response = await fetch(`/api/adminjobs/showequipments/`);

        const json = await response.json();
        console.log("here aruuuuuuuuuuuuuut");
        console.log(json);

        if (response.ok) {
          setallEquipment(json);
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
          All Equipments
        </h2>
        <div className="flex "></div>
      </div>

      <div className="relative overflow-x-auto sm:rounded-xl m-5 ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-primary">
            <tr className="border-b-[6px] border-myBG">
              {/* <th scope="col" className="px-6 py-3">
                <span className="sr-only">Image</span>
              </th> */}
              <th scope="col" className="px-6 py-3 text-center">
                Equipment
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Cost
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Availability
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Borrowed
              </th>
            </tr>
          </thead>
          <tbody>
            {allEquipment &&
              allEquipment.map((equipment, index) => (
                <tr className="bg-myCard border-b-8 border-myBG text-myText">
                  <td className="px-6 py-4 font-semibold text-center text-base">
                    {equipment.equipment_name}
                    <p className="text-sm text-gray-500">
                      type:&nbsp;
                      {equipment.type}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-semibold  text-center text-base">
                    {equipment.location_name}
                  </td>

                  <td className="px-6 py-4 font-semibold  text-center text-base">
                    {equipment.cost}
                  </td>

                  <td className="px-6 py-4 font-semibold  text-center text-base">
                    {equipment.available}
                  </td>

                  <td className="px-6 py-4 font-semibold  text-center text-base">
                    {equipment.borrowed}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
