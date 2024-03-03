import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { differenceInDays } from "date-fns";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";

import { useNotificationContext } from "../../context/NotificationContext";

export function ViewDue(params) {
  const location = useLocation();
  const notification = location.state ? location.state.notification : null;

  //console.log("noti aya gaya");
  //notification && console.log(notification);

  const { user } = useAuthContext();
  const { setNewNotificationCnt } = useNotificationContext();

  const [allDues, setAllDues] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [selectedDue, setSelectedDue] = useState(null);
  const [hasUnseenNotifications, setHasUnseenNotifications] = useState(false);
  const [seconds, setSeconds] = useState(0);
  

  const handleReport = async (due) => {
    setShowModal(true);
    setSelectedDue(due);
  };

  const handleOk = async () => {
    const response = await fetch(
      `/api/due/reportlostordamaged/${user.username}/${selectedDue.due_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity, comment }),
      }
    );

    const responseJSON = await response.json();

    console.log("jjjjjjjjjjj");
    console.log(responseJSON);
    setAllDues(
      allDues.map((due) =>
        due.due_id === selectedDue.due_id
          ? { ...due, status_name: "LostOrDamaged" }
          : due
      )
    );
    // clear everything
    setShowModal(false);
    setSelectedDue(null);
    setComment("");
    setQuantity(0);
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedDue(null);
    setComment("");
    setQuantity(0);
  };

  useEffect(() => {
    const fetchDues = async () => {
      try {
        const response = await fetch(
          `/api/due/viewduesstudent/${user.username}`
        );

        const json = await response.json();
        console.log("here are teh dues of the student");
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
      setSeconds(seconds => seconds + 1);
    }, 1000);

    return () => clearInterval(interval); // This will clear the interval if the component unmounts

  }, []);

  return (
    <div className="border border-pinky my-2 min-h-screen rounded-2xl ">
      <div className="flex justify-between">
        <h2 className="text-left text-myText mt-7 ml-5 text-2xl font-bold">
          Your DUES
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
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-white uppercase bg-primary">
            <tr className="border-b-[6px] border-myBG">
              {/* <th scope="col" className="px-6 py-3">
                <span className="sr-only">Image</span>
              </th> */}
              <th scope="col" className="px-6 py-3 text-center">
                Equipment
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Lab
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Report Lost Or Damaged
              </th>
            </tr>
          </thead>
          <tbody>
            {allDues &&
              [...allDues]
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
                    colorClass = "green-600"; // due in 3 days or less
                  } else if (daysUntilDue <= 7) {
                    colorClass = "blue-600"; // due in 7 days or less
                  } else {
                    colorClass = "green-600"; // due in more than 7 days
                  }

                  const isHighlighted =
                    notification && due.due_id === notification.type_id;

                  return (
                    <tr
                      className={`bg-myCard border-b-8 border-myBG text-myText  ${(isHighlighted && seconds<.1) ? " bg-newNoti shadow-md p-5 duration-300 " : "duration-500 "
                        }`}
                    >
                      <td className="px-6 py-4 font-semibold text-center text-base">
                        {due.equipment_name}
                        <p className="text-sm">
                          Issued:&nbsp;
                          {format(new Date(due.issue_date), "dd/MM/yyyy")}
                        </p>
                      </td>
                      <td className="px-6 py-4 font-semibold  text-center text-base">
                        {due.location_name}
                      </td>
                      <td className="px-6 py-4 font-semibold  text-center text-base">
                        {due.quantity}
                      </td>

                      <td
                        className={` py-4 text-center flex items-center justify-center`}
                      >
                        <div
                          className={` bg-${colorClass} text-white w-fit px-7 py-1 rounded-lg`}
                        >
                          {formatDistanceToNow(dueDate, { addSuffix: true })}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold  text-center text-base">
                        {due.status_name}
                      </td>
                      <td className="px-6 py-4 font-semibold  text-center text-base">
                        <button
                          className="mx-2 py-1 px-3 bg-blue-500 text-white rounded"
                          onClick={() => handleReport(due)}
                        >
                          Report
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>

        {showModal && (
          <div className="fixed w-full bg-black bg-opacity-50 top-0 left-0 z-30">
            <div className="flex items-center justify-center min-h-screen  sm:block sm:p-0">
              {/* ...rest of the modal code... */}
              <div className="bg-white ml-[35vw] rounded-lg text-left overflow-hidden sm:mt-[20vh] sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:flex-col fle items-stretch">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-grow">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Comments
                      </h3>

                      <div className="mt-4">
                        <textarea
                          value={comment}
                          placeholder="Add your comments here"
                          onChange={(e) => setComment(e.target.value)}
                          className="p-2 border rounded text-sm w-full focus:outline-none focus:ring-1 focus:ring-pinky focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-grow">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Quantity
                      </h3>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
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
    </div>
  );
}
