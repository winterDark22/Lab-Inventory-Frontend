import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { format } from "date-fns";
import { differenceInDays } from "date-fns";

import { useLocation } from "react-router-dom";
import { useNotificationContext } from "../../context/NotificationContext";

export function ViewDues(params) {
  const { user } = useAuthContext();

  const location = useLocation();
  const notification = location.state ? location.state.notification : null;
  const { setNewNotificationCnt } = useNotificationContext();
  const [seconds, setSeconds] = useState(0);

  const [seacrchByUser, setSeacrchByUser] = useState("");

  const [allDues, setAllDues] = useState([]);
  const [filter, setFilter] = useState("Pending");

  const handleSearch = (event) => {
    setSeacrchByUser(event.target.value);
  };

  const handleClearDue = (dueId) => async () => {
    try {
      const response = await fetch(
        `/api/due/cleardue/${user.username}/${dueId}`,
        {
          method: "POST",
        }
      );

      const responseJSON = await response.json();

      if (response.ok) {
        // const updatedDues = allDues.filter((due) => due.due_id !== dueId);
        // setAllDues(updatedDues);

        console.log("ki hoise");
        console.log(responseJSON);
        setAllDues(
          allDues.map((due) => {
            if (due.due_id === dueId) {
              due.status_name = "Cleared";
              due.clear_date = responseJSON.clear_date;
            }
            return due;
          })
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAlert = async () => {};

  useEffect(() => {
    const fetchDues = async () => {
      try {
        const response = await fetch(
          `/api/due/viewdueslocation/${user.username}`
        );

        const json = await response.json();
        console.log("here are teh dues of the lab assistant");
        console.log(json);

        if (response.ok) {
          setAllDues(json);
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

  const filteredDues = allDues.filter((due) => {
    return due.username.toLowerCase().startsWith(seacrchByUser.toLowerCase());
  });

  const filteredDuesByStatus = allDues.filter((due) => {
    if (filter === "Pending") return due.status_name === "Pending";
    if (filter === "Cleared") return due.status_name === "Cleared";
  });

  return (
    <div className="border border-pinky my-2 min-h-screen rounded-2xl ">
      <div className="flex justify-between m-5">
        <div className="flex items-center justify-between gap-4 ">
          <button
            onClick={() => setFilter("Pending")}
            className={`hover:text-primary text-xs uppercase p-3 w-24 rounded-lg text-gray-600 bg-myCard  active:text-myText ${
              filter === "Pending" ? "text-primary" : ""
            }`}
          >
            {" "}
            Pending
          </button>
          <button
            onClick={() => setFilter("Cleared")}
            className={`hover:text-primary text-xs uppercase p-3 w-24 rounded-lg text-gray-600 bg-myCard  active:text-myText ${
              filter === "Cleared" ? "text-primary" : ""
            }`}
          >
            {" "}
            Cleared
          </button>
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
                Student
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                {filter === "Cleared" ? "Clear Date" : " Due Date"}
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                {filter === "Cleared" ? "Status" : "Clear Due"}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDuesByStatus &&
              [...filteredDuesByStatus]
                .sort((a, b) => {
                  const dueDateA = new Date(a.due_date);
                  const dueDateB = new Date(b.due_date);
                  const today = new Date();
                  const daysUntilDueA = differenceInDays(dueDateA, today);
                  const daysUntilDueB = differenceInDays(dueDateB, today);
                  return daysUntilDueA - daysUntilDueB;
                })
                .map((due, index) => {
                  const dueDate = new Date(due.due_date);
                  const today = new Date();
                  const daysUntilDue = differenceInDays(dueDate, today);

                  let colorClass;

                  if (daysUntilDue < 0) {
                    colorClass = "pinky"; // overdue
                  } else if (daysUntilDue <= 1) {
                    colorClass = "blue-600"; // due in 3 days or less
                  } else {
                    colorClass = "green-600"; // due in more than 7 days
                  }

                  let displayText;

                  if (due.status_name === "Cleared") {
                    displayText = format(
                      new Date(due.clear_date),
                      "dd/MM/yyyy"
                    );
                    colorClass = "blue-600";
                  } else {
                    displayText = formatDistanceToNow(dueDate, {
                      addSuffix: true,
                    });
                  }

                  const isHighlighted =
                    notification && due.due_id === notification.type_id;

                  return (
                    <tr
                      className={`bg-myCard border-b-8 border-myBG text-myText  ${
                        isHighlighted && seconds < 0.1
                          ? " bg-newNoti shadow-md p-5 duration-300 "
                          : "duration-500 "
                      }`}
                    >
                      {" "}
                      {/* <td className="flex items-center justify-center rounded-lg overflow-hidden p-2">
                    <img
                      src="https://www.robotechbd.com/wp-content/uploads/2021/07/frosted-leds-red-green-blue-yellow-white-800x800-1.jpg"
                      className="w-24 md:w-28 rounded-sm sm:rounded-lg hover:scale-105 transition duration-100"
                      alt="LED"
                    />
                  </td> */}
                      <td className="px-6 py-4 font-semibold text-center text-base">
                        {due.equipment_name}
                        <p className="text-sm text-gray-500">
                          Issued:&nbsp;
                          {format(new Date(due.issue_date), "dd/MM/yyyy")}
                        </p>
                      </td>
                      <td className="px-6 py-4 font-semibold  text-center text-base">
                        {due.username}
                      </td>
                      <td className="px-6 py-4 font-semibold  text-center text-base">
                        {due.quantity}
                      </td>
                      {/* <td
                          className={` py-4 text-center flex items-center justify-center`}
                        >
                          <div
                            className={` bg-${colorClass} text-white w-fit px-7 py-1 rounded-lg`}
                          >
                            {formatDistanceToNow(dueDate, { addSuffix: true })}
                          </div>
                        </td> */}
                      <td
                        className={` py-4 text-center flex items-center justify-center`}
                      >
                        <div
                          className={` bg-${colorClass} text-white w-fit px-7 py-1 rounded-lg`}
                        >
                          {displayText}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {due.status_name !== "Cleared" ? (
                          <button
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={handleClearDue(due.due_id)}
                          >
                            Clear
                          </button>
                        ) : (
                          <p className="text-gray-700">Already Cleared!</p>
                        )}
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
