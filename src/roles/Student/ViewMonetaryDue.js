import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { format } from "date-fns";
import { differenceInDays } from "date-fns";
import { useLocation } from "react-router-dom";
import { useNotificationContext } from "../../context/NotificationContext";

export function ViewMonetaryDue(params) {
  const location = useLocation();
  const notification = location.state ? location.state.notification : null;

  const { user } = useAuthContext();
  const { setNewNotificationCnt } = useNotificationContext();
  const [allMonetaryDues, setallMonetaryDues] = useState([]);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const fetchDamages = async () => {
      try {
        const response = await fetch(
          `/api/due/viewmonetaryduesstudent/${user.username}`
        );

        const json = await response.json();
        console.log("here are them monetary dues STUDENT");
        console.log(json);
        if (response.ok) {
          setallMonetaryDues(json);
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

    fetchDamages();
    fetchUnseenNotification();
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    return () => clearInterval(interval); // This will clear the interval if the component unmounts
  }, []);

  return (
    <div className="border border-pinky my-2 min-h-screen rounded-2xl ">
      <div className="flex justify-between">
        <h2 className="text-left text-myText mt-7 ml-5 text-2xl font-bold">
          Lost/Damaged
        </h2>
        <div className="flex ">
          <input
            type="text"
            placeholder="Type here"
            className="border border-pinky bg-myBG rounded-lg text-myText text-sm placeholder:text-bg-gray-500 w-full p-2.5 m-5 focus:ring-1 focus:ring-pinky focus:outline-none focus:shadow-inner"
          />
        </div>
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
                Damaged Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Due Amount(tk)
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {allMonetaryDues &&
              [...allMonetaryDues]
                .sort((a, b) => {
                  const dueDateA = new Date(a.due_date);
                  const dueDateB = new Date(b.due_date);
                  const today = new Date();
                  const daysUntilDueA = differenceInDays(dueDateA, today);
                  const daysUntilDueB = differenceInDays(dueDateB, today);
                  return daysUntilDueA - daysUntilDueB;
                })
                .map((due, index) => {
                  const isHighlighted =
                    notification &&
                    due.monetary_due_id === notification.type_id;

                  return (
                    <tr
                      className={`bg-myCard border-b-8 border-myBG text-myText  ${(isHighlighted && seconds < .1) ? " bg-newNoti shadow-md p-5 duration-300 " : "duration-500 "
                        }`}
                    >
                      <td className="px-6 py-4 font-semibold text-center text-base">
                        {due.equipment_name}
                        <p className="text-sm text-gray-500">
                          Issued:&nbsp;
                          {format(new Date(due.issue_date), "dd/MM/yyyy")}
                        </p>
                      </td>
                      <td className="px-6 py-4 font-semibold  text-center text-base">
                        {due.location_name}
                      </td>

                      <td className="px-6 py-4 font-semibold  text-center text-base">
                        {due.damage_quantity}
                      </td>
                      <td className="px-6 py-4 font-semibold  text-center text-base">
                        {due.amount}
                      </td>
                      <td
                        className={` py-4 text-center flex items-center justify-center`}
                      >
                        <div className=" text-black w-fit px-7 py-1 rounded-lg">
                          {formatDistanceToNow(due.due_date, {
                            addSuffix: true,
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold  text-center text-base">
                        {due.status_name}
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
